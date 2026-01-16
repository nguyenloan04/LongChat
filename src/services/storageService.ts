import { storageApi } from "@/api/storage"
import { UploadLimit } from "@/constants/UploadLimit"
import { convertImageToWebp } from "@/utils/storageUtil"
import {store} from "@/redux/store.ts";
const BASE_CLOUDINARY_URL = `${import.meta.env.VITE_CLOUDINARY_URL}`
// function handle filename
function sanitizeFileName(originalName: string): string {
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
    const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, "_");
    const timestamp = Date.now();
    return `${cleanName}_${timestamp}`;
}
//Check auth before call this function
export async function uploadAttachment(
    folder: string,
    file: File,
    onProgress?: (percent: number) => void
): Promise<{ result: boolean, message: string, url:string }> {
    const [format, extension] = file.type.split("/")
    const defaultResult = { result: false, message: "Upload thất bại" ,url:""}

    const limit = format === "image"
        ? UploadLimit.IMAGE
        : format === "video"
            ? UploadLimit.VIDEO
            : null

    if (limit && file.size > limit) {
        return {
            result: false,
            message: `Chỉ được upload ${format === "image" ? "hình ảnh" : "video"} tối đa ${limit / Math.pow(1024, 2)}MB`,
            url:""
        }
    }

    if (format !== "image" && format !== "video") {
        return { result: false, message: "Định dạng không hỗ trợ", url:"" }
    }

    try {
        let uploadFile: File | Blob = file

        const cleanName = sanitizeFileName(file.name);

        if (format === "image") {
            const excludeFormat = new Set(["webp", "gif", "svg+xml"])
            if (!excludeFormat.has(extension)) {
                try {
                    uploadFile = await convertImageToWebp(file) as Blob
                } catch (e) {}
            }
        }

        const uploadDetail = await storageApi.getUploadUrl(folder, cleanName, "auto")
        const { result, ...cloudinaryData } = uploadDetail

        if (result) {
            const formData = new FormData()

            Object.entries(cloudinaryData).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            formData.append("file", uploadFile, cleanName);

            const isSuccess = await storageApi.upload(formData, format, onProgress)

            if (isSuccess) {
                let ext = "webp";
                const manualUrl = `${BASE_CLOUDINARY_URL}${folder}/${cleanName}.${ext}`;

                return {
                    result: true,
                    message: "Thành công",
                    url: manualUrl
                }
            }
        }
        return { result: false, message: "Lỗi server upload." ,url:""}
    }
    catch (error) {
        console.error("Upload error:", error)
        return defaultResult
    }
}
export async function uploadMultipleAttachments(
    folder: string,
    files: File[],
    onProgress?: (percent: number) => void // Progress này sẽ là tương đối cho cả batch
): Promise< {result: boolean, message: string, urls:string[]}> {

    // 1. Check Auth
    const state = store.getState();
    if (!state.currentUser.user) {
        return { result: false, message: "Vui lòng đăng nhập." ,urls:[]};
    }

    if (files.length === 0) return { result: false, message: "Không có file.", urls: [] };

    try {
        const processedFiles: { file: File | Blob; finalName: string; format: "image" | "video" }[] = [];

        for (const file of files) {
            const [typeStr, extension] = file.type.split("/");
            const format = typeStr as "image" | "video";

            const limit = format === "image" ? UploadLimit.IMAGE : (format === "video" ? UploadLimit.VIDEO : null);
            if (!limit || file.size > limit) continue;

            let uploadFile: File | Blob = file;
            const cleanName = sanitizeFileName(file.name);

            if (format === "image") {
                const excludeFormat = new Set(["webp", "gif", "svg+xml"]);
                if (!excludeFormat.has(extension)) {
                    try {
                        uploadFile = await convertImageToWebp(file) as Blob;
                    } catch (e) {
                        console.warn("Convert WebP error:", e);
                    }
                }
            }
            processedFiles.push({ file: uploadFile, finalName: cleanName, format });
        }

        if (processedFiles.length === 0) {
            return { result: false, message: "Không có file hợp lệ.", urls: [] };
        }

        const fileNames = processedFiles.map(f => f.finalName);
        const signatureResponse = await storageApi.getMultipleUploadUrls(folder, fileNames, "auto");

        if (!signatureResponse.result || signatureResponse.signatures.length !== processedFiles.length) {
            return { result: false, message: "Lỗi lấy chữ ký từ server.", urls: [] };
        }

        const uploadPromises = processedFiles.map(async (pToken, index) => {
            const signatureData = signatureResponse.signatures[index];
            const formData = new FormData();

            Object.entries(signatureData).forEach(([key, value]) => {
                formData.append(key, String(value));
            });
            formData.append("file", pToken.file, pToken.finalName);

            const success = await storageApi.upload(formData, pToken.format, onProgress);
                if (success) {
                    let ext = "webp";
                    return `${BASE_CLOUDINARY_URL}${folder}/${pToken.finalName}.${ext}`;
                }
                return null;
        });

        const results = await Promise.all(uploadPromises);
        const successUrls = results.filter((url): url is string => url !== null);

        if (successUrls.length === 0) {
            return { result: false, message: "Upload thất bại toàn bộ.", urls: [] };
        }

        return {
            result: true,
            message: `Thành công ${successUrls.length}/${files.length} file.`,
            urls: successUrls
        };

    } catch (e) {
        console.error(e);
        return { result: false, message: "Lỗi ngoại lệ.", urls: [] };
    }
}