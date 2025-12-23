//Props later

import { Image, PanelRight, Paperclip, Phone, Search, Send, SendHorizonal, Smile, Sticker, User } from "lucide-react";
import { Message } from "./Message";


//Mock data
const msg = [
    "Hello",
    "Đây là tin nhắn",
    "Hôm nay bạn khỏe hong",
    "Hôm nay tệ lắm hả",
    "Không sao đâu",
    "Thôi mệt quá",
    "Học bài đi nhé :D",
    "Làm bài cũ chưa mà học???"
]

export function ChatInterface() {
    return (
        <div className="p-2 py-0 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-1 px-3 border border-gray-200">
                <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                        <User />
                    </div>
                    <div>
                        <p className="font-semibold text-xl">Group 77</p>
                        <p>3 thành viên</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Search size={"1.25rem"} className="cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <Phone size={"1.25rem"} className="cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <PanelRight size={"1.25rem"} className="cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400" />
                </div>
            </div>
            {/* Main UI */}
            <div className="bg-gray-200 flex-1 overflow-y-auto flex flex-col gap-1 w-full p-2">
                {msg.map(ele => (
                    <Message
                        text={ele}
                        isOwner={Boolean(Math.round(Math.random()))}
                        username={`Người dùng ${Math.floor(Math.random() * 4)}`}
                    />
                ))}
            </div>
            {/* Message */}
            <div className="h-[8%] border border-gray-200 flex p-2">
                <textarea
                    className="p-2 flex-1 resize-none border-none outline-none focus:ring-0 focus:ring-offset-0"
                    name=""
                    id=""
                    placeholder="Nhập tin nhắn tới Group 77">
                </textarea>
                <div className="flex items-center px-3 justify-end gap-3">
                    <Paperclip size={"1.5rem"} className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <Image size={"1.5rem"} className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <Sticker size={"1.5rem"} className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <Smile size={"1.5rem"} className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <SendHorizonal size={"1.5rem"} className="ms-2 cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"/>
                </div>
            </div>
        </div>
    )
}

