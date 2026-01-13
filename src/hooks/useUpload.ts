import { uploadAttachment } from "@/services/storateService";
import { useState } from "react";

export function useUpload() {
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const startUpload = async (folder: string, file: File) => {
        setIsUploading(true)
        setProgress(0)
        const result = await uploadAttachment(folder, file, (p) => setProgress(p))
        setIsUploading(false)
        return result
    }

    return { progress, isUploading, startUpload }
}