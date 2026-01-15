//Props later

import { Image, PanelRight, Paperclip, Phone, Search, SendHorizonal, Smile, Sticker, User } from "lucide-react";
import { Message } from "./Message";
import {useEffect, useRef, useState} from "react";
import StickerPicker from "@/components/chat/StickerPicker.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {setOpenEmojiPicker, setOpenStickerPicker} from "@/redux/slices/chatTriggerSlice.ts";
import EmojiCustomPicker from "@/components/chat/EmojiCustomPicker.tsx";
import {createMessagePayload} from "@/services/chatService.ts";
import {sendPeopleChat} from "@/redux/slices/chatPeopleSlice.ts";



//Temp props, just used for display purpose
export function ChatInterface(props: { closeTabState: boolean, onCloseTab: () => void }) {

    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const messages = useSelector((state: ReduxState) =>
        currentTarget ? (state.chatState.peopleHistory[currentTarget.name] || []) : []
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


        const SendMessageComponent = ({ currentTarget }: { currentTarget: any }) => {
            const dispatch = useDispatch();
            const textareaRef = useRef<HTMLTextAreaElement>(null);
            const [inputValue, setInputValue] = useState("");

            const openStickerPicker = useSelector((state: ReduxState) => state.chatTriggerSlice.openStickerPicker);
            const openEmojiPicker = useSelector((state: ReduxState) => state.chatTriggerSlice.openEmojiPicker);

            const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setInputValue(e.target.value);
                if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
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
                <div className="min-h-16 border-t border-gray-200 bg-white flex items-end p-2 gap-2">
                    <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-2 py-1">
                <textarea
                    ref={textareaRef}
                    className="w-full bg-transparent border-none outline-none resize-none max-h-[150px] py-2 px-2 text-sm"
                    rows={1}
                    placeholder={`Nhắn tin tới ${currentTarget?.name}...`}
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                />
                    </div>

                    <div className="flex items-center gap-2 pb-1">
                        {/* Các nút chức năng */}
                        <div className="flex gap-1">
                            <Paperclip size={20} className="cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors"/>
                            <Image size={20} className="cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors"/>

                            <div className="relative">
                                <Sticker size={20}
                                         className={`cursor-pointer transition-colors ${openStickerPicker ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}
                                         onClick={() => dispatch(setOpenStickerPicker(!openStickerPicker))}
                                />
                                {openStickerPicker && <div className="absolute bottom-10 right-0 z-10"><StickerPicker /></div>}
                            </div>

                            <div className="relative">
                                <Smile size={20}
                                       className={`cursor-pointer transition-colors ${openEmojiPicker ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}
                                       onClick={() => dispatch(setOpenEmojiPicker(!openEmojiPicker))}
                                />
                                {openEmojiPicker && <div className="absolute bottom-10 right-0 z-10"><EmojiCustomPicker /></div>}
                            </div>
                        </div>

                        <button
                            onClick={handleSendText}
                            className={`p-2 rounded-full transition-all ${inputValue.trim() ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                            disabled={!inputValue.trim()}
                        >
                            <SendHorizonal size={20} />
                        </button>
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
            <SendMessageComponent currentTarget={currentTarget} />
        </div>
    )
}

