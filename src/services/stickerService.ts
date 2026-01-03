export interface KlipyStickerResponse {
    data: {
        data: {
            id: string,
            slug: string,
            title: string,
            file: {
                hd: {
                    webp: {
                        url: string,
                        width: number,
                        height: number,
                        size: number,
                    }
                },
                md: {
                    webp: {
                        url: string,
                        width: number,
                        height: number,
                        size: number,
                    }
                }
                sm: {
                    webp: {
                        url: string,
                        width: number,
                        height: number,
                        size: number,
                    }
                }
                xs: {
                    webp: {
                        url: string,
                        width: number,
                        height: number,
                        size: number,
                    }
                }
            },
            blur_preview: string
        }[],
        current_page: number,
        per_page: number,
        has_next: boolean,
    },
}

export class stickerService {
    static async trending(page = 1, perPage = 40, customerId = "LongChat"): Promise<KlipyStickerResponse> {
        const url = `${BASE_URL}/${KLIPY_API_KEY}/stickers/trending?page=${page}&per_page=${perPage}&customer_id=${customerId}&format_filter=webp`
        const res = await fetch(url, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error("Klipy API Error");
        }
        return  res.json();
    }
    
    static async search(search: string, page = 1, perPage = 40, customerId = "LongChat"): Promise<KlipyStickerResponse> {
        const url = `${BASE_URL}/${KLIPY_API_KEY}/stickers/search?page=${page}&per_page=${perPage}&q=${search}&customer_id=${customerId}&format_filter=webp`
        const res = await fetch(url, {
            method: 'GET'
        })

        if (!res.ok) {
            throw new Error("Klipy API Error");
        }
        return  res.json();
    }
}