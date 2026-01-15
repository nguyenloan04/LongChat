import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageToRoom, sendPeopleChat} from "@/redux/slices/chatSlice.ts";
import type {ReduxState} from "@/constants/ReduxState.ts";

export function StickerPreview(props: {src: string, preview: string}) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);
    const currentChatTarget = useSelector((state:ReduxState) => state.chatState.currentChatTarget);
    const handleSticker = () => {
        if(!currentUser || !currentChatTarget) return;
        
        const stickers = JSON.parse(localStorage.getItem("stickerHistory") || "[]");
        const newStickers = [{src: props.src, preview: props.preview}, ...stickers];
        localStorage.setItem("stickerHistory", JSON.stringify(newStickers));
        
        const message = {
            type: "sticker",
            content: props.src,
            attachment: []
        }
        
        if(currentChatTarget.type === 0) {
            dispatch(sendPeopleChat({
                type: "people",
                to: currentChatTarget.name,
                mes: JSON.stringify(message)
            }))
        } else {
            dispatch(sendMessageToRoom({
                roomName: currentChatTarget.name,
                message: message,
                username: currentUser.username,
            }))
        }
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