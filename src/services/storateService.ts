import { storageApi } from "@/api/storage"
import { UploadLimit } from "@/constants/UploadLimit"
import { convertImageToWebp } from "@/utils/storageUtil"



//Check auth before call this function
export async function uploadAttachment(folder: string, file: File): Promise<{ result: boolean, message: string }> {
    const [format, extension] = file.type.split("/")
    const defaultResult = { result: false, message: "Upload thất bại" }

    const limit = format === "image"
        ? UploadLimit.IMAGE
        : format === "video"
            ? UploadLimit.VIDEO
            : null

    if (limit && file.size > limit) {
        return {
            result: false,
            message: `Chỉ được upload ${format === "image" ? "hình ảnh" : "video"} tối đa ${limit / Math.pow(1024, 2)}MB`
        }
    }

    if (format !== "image" && format !== "video") {
        return { result: false, message: "Định dạng không hỗ trợ" }
    }

    try {
        let uploadFile: File | Blob = file
        let finalFileName = file.name

        if (format === "image") {
            const excludeFormat = new Set(["webp", "gif", "svg+xml"])
            if (!excludeFormat.has(extension)) {
                uploadFile = await convertImageToWebp(file) as Blob
                finalFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp"
            }
        }

        const uploadDetail = await storageApi.getUploadUrl(folder, finalFileName, format)
        const { result, ...cloudinaryData } = uploadDetail

        if (result) {
            const formData = new FormData()
            formData.append("file", uploadFile, finalFileName)

            Object.entries(cloudinaryData).forEach(([k, v]) => formData.append(k, String(v)))

            const uploadResult = await storageApi.upload(formData, format)
            return {
                result: uploadResult,
                message: uploadResult ? "Upload thành công" : "Upload thất bại"
            }
        }
        return defaultResult
    }
    catch (error) {
        console.error("Upload error:", error)
        return defaultResult
    }
}