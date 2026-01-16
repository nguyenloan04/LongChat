import axios from 'axios'

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}`
const CLOUD_NAME = `${import.meta.env.VITE_CLOUD_NAME}`

export const storageApi = {
    getUploadUrl: async (folder: string, fileName: string, contentType: string) => {
        return await axios.get(`${SERVER_URL}/get-upload-url?folder=${folder}&fileName=${fileName}&contentType=${contentType}`).then(response => {
            try {
                return JSON.parse(response.data) as {
                    signature: string
                    api_key: string
                    cloud_name: string
                    result: boolean
                }
            }
            catch (_) {
                return {
                    signature: "",
                    api_key: "",
                    cloud_name: "",
                    result: false
                }
            }
        })
    },
    getMultipleUploadUrls: async (folder: string, fileNames: string[], contentType: string) => {
        return await axios.get(`${SERVER_URL}/upload/upload-multiple-attachment`, {
            params: { folder, fileName: fileNames, contentType },
            paramsSerializer: (params) => {
                const searchParams = new URLSearchParams();
                searchParams.append("folder", params.folder);
                searchParams.append("contentType", params.contentType);
                params.fileName.forEach((name: string) => {
                    searchParams.append("fileName", name);
                });
                return searchParams.toString();
            }
        }).then(response => {
            try {
                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                return data as {
                    result: boolean;
                    signatures: Array<{
                        signature: string;
                        api_key: string;
                        cloud_name: string;
                        // timestamp: number;
                        // public_id: string;
                        // folder: string;
                        [key: string]: any;
                    }>
                }
            } catch (_) {
                return { result: false, signatures: [] }
            }
        })
    },


    upload: async (formData: FormData, format: "image" | "video", onProgress?: (percent: number) => void) => {
        return await axios
            .post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${format}/upload`,
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"},
                    onUploadProgress: (progressEvent) => {
                        if (onProgress && progressEvent.total) {
                            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            onProgress(percent)
                        }
                    }
                }
            )
            .then(response => response.status === 200)
    }
}