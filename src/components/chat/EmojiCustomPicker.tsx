import EmojiPicker from "emoji-picker-react";
import {useEffect, useState} from "react";
import {X} from "lucide-react";
import {setOpenEmojiPicker} from "@/redux/slices/chatPickerSlice.ts";
import {useDispatch} from "react-redux";

export default function EmojiCustomPicker() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    
    function encoderEmoji(emoji: any) {
        return " :emoji:"+encodeURIComponent(emoji)+" "
    }
    //Test. Delete later
    useEffect(() => {
        console.log(message)
    }, [message]);
    
    return (
        <div className="fixed overflow-hidden rounded-lg border bottom-14 index-99 bg-white border">
            <div className="relative mb-1">
                <p className="shadow text-lg p-2 font-semibold text-center">Emoji</p>
                <X className="absolute right-2 top-3 hover:bg-neutral-300/30 rounded"
                   onClick={() => dispatch(setOpenEmojiPicker(false))}/>
            </div>

            <EmojiPicker
                onEmojiClick={(emojiData) =>
                    setMessage((prev) => prev + encoderEmoji(emojiData.emoji))
                }
            />
        </div>
    );
}
