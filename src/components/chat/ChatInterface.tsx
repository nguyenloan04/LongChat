//Props later

import { Image, PanelRight, Paperclip, Phone, Search, SendHorizonal, Smile, Sticker, User } from "lucide-react";
import { Message } from "./Message";
import {useEffect, useRef, useState} from "react";
import StickerPicker from "@/components/chat/StickerPicker.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {setOpenEmojiPicker, setOpenStickerPicker} from "@/redux/slices/chatPickerSlice.ts";
import EmojiCustomPicker from "@/components/chat/EmojiCustomPicker.tsx";
import {createMessagePayload} from "@/services/chatService.ts";
import {sendPeopleChat} from "@/redux/slices/chatPeopleSlice.ts";


//Mock data
// const msg = [
//     "Hello",
//     "Đây là tin nhắn",
//     "Hôm nay bạn khỏe hong",
//     "Hôm nay tệ lắm hả",
//     "Không sao đâu",
//     "Thôi mệt quá",
//     "Học bài đi nhé :D",
//     "Làm bài cũ chưa mà học???"
// ]

//Temp props, just used for display purpose
export function ChatInterface(props: { closeTabState: boolean, onCloseTab: () => void }) {
    // const SendMessageComponent = () => {
    //     const openStickerPicker = useSelector((state: ReduxState) => state.chatPickerSlice.openStickerPicker)
    //     const openEmojiPicker = useSelector((state: ReduxState) => state.chatPickerSlice.openEmojiPicker)
    //     const dispatch = useDispatch();
    //     const textareaRef = useRef<HTMLTextAreaElement>(null);
    //
    //     const handleInput = (_: React.ChangeEvent<HTMLTextAreaElement>) => {
    //         const textarea = textareaRef.current;
    //         if (textarea) {
    //             textarea.style.height = 'auto';
    //
    //             const maxHeight = 200;
    //             const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    //
    //             textarea.style.height = `${nextHeight}px`;
    //
    //             textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    //         }
    //     };

    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);

    const messages = useSelector((state: ReduxState) =>
        currentTarget ? (state.chatState.peopleHistory[currentTarget.name] || []) : []
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const SendMessageComponent = () => {
        const openStickerPicker = useSelector((state: ReduxState) => state.chatPickerSlice.openStickerPicker);
        const openEmojiPicker = useSelector((state: ReduxState) => state.chatPickerSlice.openEmojiPicker);
        const dispatch = useDispatch();
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const [inputValue, setInputValue] = useState("");

        const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue(e.target.value);
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                const maxHeight = 200;
                const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
                textarea.style.height = `${nextHeight}px`;
                textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
            }
        };

        const handleSendText = () => {
            if (!inputValue.trim() || !currentTarget) return;

            const jsonMessage = createMessagePayload(inputValue.trim(), [], "chat");

            dispatch(sendPeopleChat({
                type: 'people',
                to: currentTarget.name,
                mes: jsonMessage
            }));

            setInputValue("");
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        };


        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendText();
            }
        };
        return (
    //         <div className="min-h-4 border-t border-gray-200 flex p-2">
    //             <textarea
    //                 className="bg-neutral-200/75 rounded-3xl p-2 ps-4 flex-1 resize-none border-none outline-none focus:ring-0 focus:ring-offset-0"
    //                 onChange={handleInput}
    //                 ref={textareaRef}
    //                 name=""
    //                 id=""
    //                 rows={1}
    //                 placeholder="Nhập tin nhắn tới Group 77">
    //             </textarea>
    //             <div
    //                 className="flex items-start px-3 justify-end gap-3"
    //             >
    //                 <div className="flex items-start justify-end gap-3 pt-2">
    //                     <Paperclip size={"1.5rem"}
    //                                className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"/>
    //                     <Image size={"1.5rem"}
    //                            className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"/>
    //                     <Sticker size={"1.5rem"}
    //                              className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"
    //                              onClick={() => dispatch(setOpenStickerPicker(!openStickerPicker))}
    //                     />
    //                     {openStickerPicker && <StickerPicker />}
    //
    //                     <Smile size={"1.5rem"}
    //                            className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"
    //                            onClick={() => dispatch(setOpenEmojiPicker(!openEmojiPicker))}
    //                     />
    //                     {openEmojiPicker && <EmojiCustomPicker />}
    //                 </div>
    //                 <div className="pt-0.5">
    //                     <SendHorizonal size={"2.25rem"} className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-300 rounded-full p-2 cursor-pointer text-neutral-100 hover:text-neutral-200 active:text-neutral-300" />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    //
    // return (
    //     <div className="py-0 flex flex-col h-full">
    //         {/* Header */}
    //         <div className="flex justify-between items-center p-1 px-3 border border-gray-200 h-16">
    //             <div className="flex gap-3 items-center">
    //                 <div className="w-12 h-12 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
    //                     <User />
    //                 </div>
    //                 <div>
    //                     <p className="font-semibold text-xl">Group 77</p>
    //                     <p>3 thành viên</p>
    //                 </div>
    //             </div>
    //             <div className="flex gap-1">
    //                 <Search size={"2.25rem"} className="rounded p-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400" />
    //                 <Phone size={"2.25rem"} className="rounded p-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400" />
    //                 <PanelRight
    //                     size={"2.25rem"}
    //                     className={`rounded p-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400 ${props.closeTabState && "bg-indigo-200 text-indigo-700"}`}
    //                     onClick={props.onCloseTab}
    //                 />
    //             </div>
    //         </div>
    //         {/* Main UI */}
    //         <div className="flex-1 overflow-y-auto flex flex-col gap-1 w-full bg-gray-300/50 p-2">
    //             {msg.map(ele => (
    //                 <Message
    //                     text={ele}
    //                     isOwner={Boolean(Math.round(Math.random()))}
    //                     username={`Người dùng ${Math.floor(Math.random() * 4)}`}
    //                 />
    //             ))}
    //         </div>
    //         {/* Message */}
    //         <SendMessageComponent />
    //     </div>
            <div className="min-h-4 border-t border-gray-200 flex p-2 items-end">
                <textarea
                    className="bg-neutral-200/75 rounded-3xl p-2 ps-4 flex-1 resize-none border-none outline-none focus:ring-0 focus:ring-offset-0 max-h-[200px]"
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    ref={textareaRef}
                    value={inputValue}
                    rows={1}
                    placeholder={`Nhập tin nhắn tới ${currentTarget?.name || "..."}`}>
                </textarea>
                <div className="flex items-start px-3 justify-end gap-3 pb-1">
                    <div className="flex items-start justify-end gap-3 pt-2">
                        <Paperclip size={"1.5rem"} className="cursor-pointer text-gray-700 hover:text-neutral-500"/>
                        <Image size={"1.5rem"} className="cursor-pointer text-gray-700 hover:text-neutral-500"/>

                        {/* Sticker Trigger */}
                        <div className="relative">
                            <Sticker size={"1.5rem"}
                                     className={`cursor-pointer ${openStickerPicker ? "text-indigo-500" : "text-gray-700"} hover:text-neutral-500`}
                                     onClick={() => dispatch(setOpenStickerPicker(!openStickerPicker))}
                            />
                            {/* Pass callback function to StickerPicker if needed to handle send directly */}
                            {openStickerPicker && <StickerPicker />}
                        </div>

                        {/* Emoji Trigger */}
                        <div className="relative">
                            <Smile size={"1.5rem"}
                                   className={`cursor-pointer ${openEmojiPicker ? "text-indigo-500" : "text-gray-700"} hover:text-neutral-500`}
                                   onClick={() => dispatch(setOpenEmojiPicker(!openEmojiPicker))}
                            />
                            {/* EmojiPicker should probably insert into input value */}
                            {openEmojiPicker && <EmojiCustomPicker />}
                        </div>
                    </div>
                    <div onClick={handleSendText}>
                        <SendHorizonal size={"2.25rem"} className="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-300 rounded-full p-2 cursor-pointer text-neutral-100" />
                    </div>
                </div>
            </div>
        )
    }

    if (!currentTarget) {
        return (
            <div className="flex flex-col h-full items-center justify-center bg-gray-50">
                <p className="text-xl text-gray-500">Hãy chọn một đoạn chat để bắt đầu</p>
            </div>
        )
    }

    return (
        <div className="py-0 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-1 px-3 border border-gray-200 h-16 bg-white">
                <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                        <User />
                    </div>
                    <div>
                        <p className="font-semibold text-xl">{currentTarget.name}</p>
                        <p className="text-xs text-gray-500">
                            {currentTarget.type === 0 ? "Người dùng" : "Nhóm"}
                        </p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Search size={"2.25rem"} className="rounded p-2 cursor-pointer hover:bg-gray-100" />
                    <Phone size={"2.25rem"} className="rounded p-2 cursor-pointer hover:bg-gray-100" />
                    <PanelRight
                        size={"2.25rem"}
                        className={`rounded p-2 cursor-pointer hover:bg-gray-100 ${props.closeTabState && "bg-indigo-100 text-indigo-700"}`}
                        onClick={props.onCloseTab}
                    />
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 w-full bg-gray-300/50 p-2">
                {messages.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">Bắt đầu cuộc trò chuyện...</p>
                )}

                {messages.map((ele, index) => (
                    <Message
                        key={index}
                        rawMessage={ele.mes}
                        isOwner={ele.name === currentUser?.username}
                        username={ele.name}
                        time={ele.createAt}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <SendMessageComponent />
        </div>
    )
}

