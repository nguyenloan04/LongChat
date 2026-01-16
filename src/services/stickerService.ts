const BASE_URL = import.meta.env.VITE_SERVER_URL+"/stickers";

export interface StickerResponse {
    data: {
        data: {
            id: string,
            slug: string,
            file: {
                md: {
                    webp: {
                        url: string,
                    }
                }
            },
            blur_preview: string
        }[],
        has_next: boolean
    },
}

export class stickerService {
    static async trending(page = 1, perPage = 40): Promise<StickerResponse> {
        const url = `${BASE_URL}/trending?page=${page}&perPage=${perPage}`
        const res = await fetch(url, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error("Klipy API Error");
        }
        return  res.json();
    }
    
    static async search(search: string, page = 1, perPage = 40): Promise<StickerResponse> {
        const url = `${BASE_URL}/search?search=${search}&page=${page}&perPage=${perPage}`
        const res = await fetch(url, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error("Klipy API Error");
        }
        return  res.json();
    }
}