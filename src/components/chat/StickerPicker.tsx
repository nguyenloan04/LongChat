import {useEffect, useState} from "react";
import {stickerService} from "@/services/stickerService.ts";

export default function StickerPicker() {
    const [stickers, setStickers] = useState<string[]>([]);
    useEffect(() => {
        stickerService.trending("22130276").then(
            res => {
                const urls = res.data.data.map(sticker =>
                    sticker.file.md?.webp?.url
                ).filter(Boolean) as string[];
                setStickers(urls)
            }
        ).catch()
    }, []);
    return (
        <div className="fixed rounded-lg shadow border bottom-14 index-99 bg-white border w-90">
            <p className="shadow text-lg p-2 text-center">Sticker</p>
            <hr/>
            <div className="px-3 mb-2 pt-2">
                <input type="search" placeholder="Tìm kiếm..." className="p-2 w-full border rounded"/>
            </div>

            <div className="overflow-y-auto h-80 p-2 grid grid-cols-4 gap-2">
                {
                    stickers.map(value => (
                        <div className="h-20 p-1 cursor-pointer hover:bg-neutral-400/30 rounded">
                            <img src={value} className="object-contain w-full h-full"/>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}