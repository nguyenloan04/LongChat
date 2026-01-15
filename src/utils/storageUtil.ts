export function convertImageToWebp(file: File) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0)
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(img.src)
                resolve(blob)
            }, 'image/webp', 0.8)
        }
        img.onerror = () => reject(new Error("Error when loading file"))
    })
}