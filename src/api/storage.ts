import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const SERVER_URL = process.env.SERVER_URL
const CLOUD_NAME = process.env.CLOUD_NAME

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