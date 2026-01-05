import {useState} from "react";

export function StickerPreview(props: {src: string, preview: string}) {
    const [loading, setLoading] = useState(true);
    
    const handleSticker = () => {
        const stickers = JSON.parse(localStorage.getItem("stickerHistory") || "[]");
        const newStickers = [{src: props.src, preview: props.preview}, ...stickers];
        localStorage.setItem("stickerHistory", JSON.stringify(newStickers));
    }
    
    return (
        <div className="h-20 p-1 cursor-pointer hover:bg-neutral-400/30 rounded">
            <img src={props.preview} className={`object-contain w-full h-full transition-opacity duration-300 
                                                ${loading ? "opacity-100" : "opacity-0 hidden"}`}/>
            <img src={props.src} onLoad={() => setLoading(false)}
                 className={`object-contain w-full h-full`} onClick={handleSticker} />
        </div>
    )
}