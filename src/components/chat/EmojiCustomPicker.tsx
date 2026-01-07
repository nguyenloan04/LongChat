import EmojiPicker, {Theme} from "emoji-picker-react";
import {useEffect, useState} from "react";
import {X} from "lucide-react";
import {setOpenEmojiPicker} from "@/redux/slices/chatTriggerSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";

export default function EmojiCustomPicker() {
    const dispatch = useDispatch();
    const theme = useSelector((state:ReduxState) => state.userPageState.theme)
    const [message, setMessage] = useState("");
    
    function encoderEmoji(emoji: any) {
        return `:${encodeURIComponent(emoji)}:`
    }
    //Test. Delete later
    useEffect(() => {
        console.log(message)
    }, [message]);
    
    return (
        <div className="fixed overflow-hidden rounded-lg border bottom-14 index-99 bg-white dark:bg-gray-800 border">
            <div className="relative mb-1">
                <p className="shadow text-lg p-2 font-semibold text-center">Emoji</p>
                <X className="absolute right-2 top-3 hover:bg-neutral-300/30 rounded"
                   onClick={() => dispatch(setOpenEmojiPicker(false))}/>
            </div>

            <EmojiPicker theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                onEmojiClick={(emojiData) =>
                    setMessage((prev) => prev + encoderEmoji(emojiData.emoji))
                }
            />
        </div>
    );
}
