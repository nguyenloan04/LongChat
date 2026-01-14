import EmojiPicker, {Categories, Theme} from "emoji-picker-react";
import {X} from "lucide-react";
import {setOpenEmojiPicker} from "@/redux/slices/chatTriggerSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";

export default function EmojiCustomPicker() {
    const dispatch = useDispatch();
    const theme = useSelector((state: ReduxState) => state.userPageState.theme)

    function encoderEmoji(emoji: any) {
        return `:${encodeURIComponent(emoji)}:`
    }

    return (
        <div className="fixed overflow-hidden rounded-lg border bottom-14 index-99 bg-white dark:bg-gray-800 border">
            <div className="relative mb-1">
                <p className="shadow text-lg p-2 font-semibold text-center">Emoji</p>
                <X className="absolute right-2 top-3 hover:bg-neutral-300/30 rounded"
                   onClick={() => dispatch(setOpenEmojiPicker(false))}/>
            </div>

            <EmojiPicker theme={theme === "dark" ? Theme.DARK : Theme.LIGHT} searchPlaceholder="Tìm kiếm emoji..."
                         categories={[
                             {
                                 category: Categories.SUGGESTED,
                                 name: "Hay dùng"
                             },
                             {
                                 category: Categories.SMILEYS_PEOPLE,
                                 name: "Mặt cười & Người"
                             },
                             {
                                 category: Categories.ANIMALS_NATURE,
                                 name: "Động vật"
                             },
                             {
                                 category: Categories.FOOD_DRINK,
                                 name: "Ăn uống"
                             },
                             {
                                 category: Categories.TRAVEL_PLACES,
                                 name: "Du lịch"
                             },
                             {
                                 category: Categories.ACTIVITIES,
                                 name: "Hoạt động"
                             },
                             {
                                 category: Categories.OBJECTS,
                                 name: "Đồ vật"
                             },
                             {
                                 category: Categories.SYMBOLS,
                                 name: "Biểu tượng"
                             },
                             {
                                 category: Categories.FLAGS,
                                 name: "Cờ"
                             }
                         ]}
                         previewConfig={{
                             defaultEmoji: "1f60a",
                             defaultCaption: "Chọn một biểu tượng...",
                             showPreview: true
                         }}
                         onEmojiClick={(emojiData) =>
                             // FIXME: insert emoji to typing message
                             console.log("emoji", encoderEmoji(emojiData.emoji))
                         }
            />
        </div>
    );
}
