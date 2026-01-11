import {useEffect, useState} from "react";
import {stickerService} from "@/services/stickerService.ts";
import {ChevronLeft, ChevronRight, Clock4, Flame, Frown, Heart, Search, Smile, X} from "lucide-react";
import {StickerPreview} from "@/components/chat/StickerPreview.tsx";
import {useDispatch} from "react-redux";
import {setOpenStickerPicker} from "@/redux/slices/chatPickerSlice.ts";

export default function StickerPicker() {
    const [stickers, setStickers] = useState<{ src: string, preview: string }[]>([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [key, setKey] = useState<string>("trending");
    const dispatch = useDispatch()
    
    const selectSticker = [
        {
            key: 'history',
            icon: <Clock4 size={"1.5rem"}/>
        },
        {
            key: 'trending',
            icon: <Flame size={"1.5rem"}/>
        },
        {
            key: 'search',
            icon: <Search size={"1.5rem"}/>
        },
        {
            key: 'smile',
            icon: <Smile size={"1.5rem"}/>
        },
        {
            key: 'sad',
            icon: <Frown size={"1.5rem"}/>
        },
        {
            key: 'love',
            icon: <Heart size={"1.5rem"}/>
        },
    ]
    const handleTrending = () => {
        stickerService.trending(page).then(
            res => {
                const urls = res.data.data.map(sticker => ({
                        src: sticker.file.md?.webp?.url,
                        preview: sticker.blur_preview
                    })
                ).filter(Boolean) as { src: string, preview: string }[];
                setStickers(urls)
                setNext(res.data.has_next);
            }
        ).catch()
    }
    const handleSearch = (search: string) => {
        stickerService.search(search, page).then((res) => {
            const urls = res.data.data.map(sticker => ({src: sticker.file.md?.webp?.url, preview: sticker.blur_preview})
            ).filter(Boolean) as { src: string, preview: string }[];
            setStickers(urls)
            setNext(res.data.has_next);
        }).catch()
    }
    const handleChangePage = (key: string) => {
        setPage(1);
        setKey(key)
    }
    
    useEffect(() => {
        setLoading(true);
        switch (key) {
            case 'trending':
                handleTrending()
                break;
            case 'search':
                handleSearch(search);
                break;
            case 'smile':
                handleSearch("smile");
                break;
            case 'sad':
                handleSearch("sad")
                break;
            case 'love':
                handleSearch("love")
                break;
            case 'history':
                const history = JSON.parse(localStorage.getItem("stickerHistory") || "[]")
                setStickers(history)
                setNext(false)
                break;
        }
        setLoading(false);
    }, [page, key]);
    
    return (
        <div className="fixed overflow-hidden rounded-lg shadow border bottom-14 index-99 bg-white dark:bg-gray-800 border w-90">
            <div className="relative">
                <p className="shadow text-lg p-2 font-semibold text-center">Sticker</p>
                <X className="absolute right-2 top-3 hover:bg-neutral-300/30 rounded" onClick={() => dispatch(setOpenStickerPicker(false))}/>
            </div>
            <hr/>
            <div className="flex gap-2 justify-between px-3 mb-2 pt-2">
                <input type="search" placeholder="Tìm kiếm..." maxLength={50} className="p-2 w-full border rounded-lg"
                       onChange={(e) => setSearch(e.target.value)}/>
                <button
                    className={`border w-30 bg-indigo-500 text-white rounded-lg cursor-pointer dark:bg-neutral-400/30 dark:hover:bg-neutral-300/30 hover:bg-indigo-500/50`}
                    disabled={loading}
                    onClick={() => {
                        if(key === "search" && page === 1) {
                            handleSearch(search)
                        } else {
                            handleChangePage("search")
                        }
                    }}>Tìm kiếm
                </button>
            </div>
            {stickers.length > 0 ? (
                <div className="overflow-y-auto h-80 p-2 grid grid-cols-4 gap-2">
                    {stickers.map(value => (
                        <StickerPreview src={value.src} preview={value.preview}/>
                    ))}
                </div>) : (<div className="h-80 text-center content-center text-neutral-500">Không có sticker</div>)
            }

            <div className="flex justify-between">
                <button
                    className={`p-2 ${!loading && (page - 1 > 0) ? "text-neutral-500 dark:text-neutral-100 cursor-pointer hover:bg-neutral-300/30" : "text-neutral-300 dark:text-neutral-500"}`}
                    disabled={loading || (page - 1 <= 0)} onClick={() => setPage(page - 1)}>
                    <ChevronLeft size={"1.5rem"}/>
                </button>

                <div className="flex justify-center">
                    {selectSticker.map(select => (
                        <button
                            className={`p-2 dark:text-neutral-100 text-neutral-500 cursor-pointer ${key === select.key ? "text-yellow-700 bg-neutral-300/30" : "hover:bg-neutral-300/30"}`}
                            onClick={() => handleChangePage(select.key)}>
                            {select.icon}
                        </button>
                    ))}
                </div>
                <button
                    className={`p-2 ${!loading && next ? "text-neutral-500 dark:text-neutral-100 cursor-pointer hover:bg-neutral-300/30" : "text-neutral-300 dark:text-neutral-500"}`}
                    disabled={loading || !next} onClick={() => setPage(page + 1)}>
                    <ChevronRight size={"1.5rem"}/>
                </button>
            </div>
        </div>
    )
}