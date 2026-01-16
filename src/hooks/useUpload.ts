import { uploadAttachment, uploadMultipleAttachments } from "@/services/storageService";
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
    const startMultipleUpload = async (folder: string, files: File[]): Promise<{ result:boolean, message:string, urls: string[] }> => {
        setIsUploading(true);
        setProgress(0);
        const result = await uploadMultipleAttachments(folder, files, (p) => setProgress(p));
        setIsUploading(false);
        return result;
    }
    return { progress, isUploading, startUpload , startMultipleUpload}
}