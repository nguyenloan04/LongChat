//Props later

import {
    ArrowLeft,
    Image,
    LoaderCircle, Menu,
    PanelRight,
    Paperclip,
    Phone,
    Search,
    SendHorizonal,
    Smile,
    Sticker,
    User,
    X
} from "lucide-react";
import { Message } from "./Message";
import React, { useEffect, useRef, useState } from "react";

import StickerPicker from "@/components/chat/StickerPicker.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState.ts";
import { setOpenEmojiPicker, setOpenStickerPicker } from "@/redux/slices/chatTriggerSlice.ts";
import EmojiCustomPicker from "@/components/chat/EmojiCustomPicker.tsx";
import { createMessagePayload } from "@/services/chatService.ts";
import {
    getUserList,
    receiveNewMessageFromRoom,
    sendMessageToRoom,
    sendPeopleChat,
    setInputValue
} from "@/redux/slices/chatSlice";
import { ChatToolBar } from "./ChatToolBar";
import { formatSendTime } from "@/utils/messageUtil";
import "../../styles/chat-interface-style.css"
import type { ReceiveMsgGetChatPeoplePayload, ReceiveMsgGetChatRoomPayload } from "@/socket/types/WebsocketReceivePayload.ts";
// upload
import { useUpload } from "@/hooks/useUpload";
import { Input } from "@/components/ui/input";

//Temp props, just used for display purpose
export function ChatInterface(props: { closeTabState: boolean, onCloseTab: () => void , onOpenMenu: () => void }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    //upload multiple files
    const { startMultipleUpload, isUploading } = useUpload();

    const getRoomData = useSelector((state: ReduxState): ReceiveMsgGetChatRoomPayload | null => {
        if (!currentTarget) return null;
        if (currentTarget.type === 0) {
            return null
        } else {
            const roomData = state.chatState.roomHistory[currentTarget.name];
            return roomData
        }
    });

    const messages = useSelector((state: ReduxState) => {
        if (!currentTarget) return [];

        if (currentTarget.type === 0) {
            return state.chatState.chatPeopleHistory[currentTarget.name] || [];
        } else {
            const roomData = state.chatState.roomHistory[currentTarget.name];
            return roomData ? roomData.chatData as ReceiveMsgGetChatPeoplePayload[] : [];
        }
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const SendMessageComponent = () => {
        const dispatch = useDispatch();

        // state for files
        const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
        const fileInputRef = useRef<HTMLInputElement>(null);
        const userList = useSelector((state: ReduxState) => state.chatState.userList)
        const inputValue = useSelector((state: ReduxState) => state.chatState.inputValue)

        const openStickerPicker = useSelector((state: ReduxState) => state.chatTriggerSlice.openStickerPicker)
        const openEmojiPicker = useSelector((state: ReduxState) => state.chatTriggerSlice.openEmojiPicker)

        const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(setInputValue(e.target.value));
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
            }
        };

        // handle choose file
        const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
            }
            // e.target.value = "";
        };

        const removeFile = (index: number) => {
            setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        };
        const handleSendText = async () => {
            if ((!inputValue.trim() && selectedFiles.length === 0) || !currentTarget || !currentUser) return;
            if (isUploading) return;
            //upload file
            let uploadedUrls: string[] = [];
            if (selectedFiles.length > 0) {
                const uploadRes = await startMultipleUpload("chat_uploads", selectedFiles);
                if (uploadRes.result) {
                    uploadedUrls = uploadRes.urls;
                } else {
                    console.error("Upload failed:", uploadRes.message);
                    alert("Gửi file thất bại: " + uploadRes.message);
                    return;
                }
            }

            const msgType = uploadedUrls.length > 0 ? "attachment" : "chat";
            const contentText = inputValue.trim();

            const jsonMessage = createMessagePayload(contentText, uploadedUrls, msgType);
            if (currentTarget.type === 0) {
                dispatch(sendPeopleChat({
                    type: 'people',
                    to: currentTarget.name,
                    mes: jsonMessage
                }));

            } else {
                dispatch(sendMessageToRoom({
                    roomName: currentTarget.name,
                    message: jsonMessage,
                    username: currentUser.username,
                }))
                if (!(userList[0].name === currentTarget.name && userList[0].type === currentTarget.type)) {
                    dispatch(getUserList({}))
                }

                setTimeout(() => {
                    dispatch(receiveNewMessageFromRoom({
                        id: Date.now(),
                        name: currentUser.username,
                        to: currentTarget.name,
                        mes: jsonMessage,
                        type: 1,
                        createAt: new Date().toISOString()
                    }))
                }, 500)
            }

            dispatch(setInputValue(""))
            setSelectedFiles([])
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        };

        // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        //     if (e.key === 'Enter' && !e.shiftKey) {
        //         e.preventDefault();
        //         handleSendText();
        //     }
        // };

        return (
            <div className="flex flex-col p-1 pt-0">
                {selectedFiles.length > 0 && (
                    <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                        {selectedFiles.map((file, index) => (
                            <div key={index}
                                className="relative w-16 h-16 shrink-0 border rounded-lg bg-gray-50 overflow-hidden group">
                                <button
                                    onClick={() => removeFile(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-80 hover:opacity-100 z-10"
                                >
                                    <X size={12} />
                                </button>
                                {file.type.startsWith("image/") ? (
                                    <img src={URL.createObjectURL(file)} alt="preview"
                                        className="w-full h-full object-cover" />
                                ) : (
                                    <div
                                        className="flex items-center justify-center h-full text-[10px] text-center p-1 break-all bg-white">
                                        {file.name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <Input
                    type="file"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                    onClick={(e) => { (e.target as HTMLInputElement).value = ""; }}
                />
                <div className="min-h-4 flex p-2 pt-0">
                    <textarea
                        className="min-w-0 text-md bg-neutral-200/75 rounded-3xl p-2 ps-4 flex-1 resize-none border-none outline-none focus:ring-0 focus:ring-offset-0"
                        onChange={handleInput}
                        ref={textareaRef}
                        value={inputValue}
                        name=""
                        id=""
                        rows={1}
                        placeholder="Nhập tin nhắn..."
                    // placeholder={`Nhập tin nhắn ${currentTarget ? "tới " + currentTarget.name : "..."}`}
                    >
                    </textarea>
                    <div
                        className="flex items-start px-3 justify-end gap-3"
                    >
                        <div className="flex items-start justify-end gap-3 pt-2">
                            <Paperclip size={"1.5rem"}
                                className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400" />
                            <Image size={"1.5rem"}
                                className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"
                                onClick={() => !isUploading && fileInputRef.current?.click()} />
                            <Sticker size={"1.5rem"}
                                className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"
                                onClick={() => dispatch(setOpenStickerPicker(!openStickerPicker))}
                            />
                            {openStickerPicker && <StickerPicker />}
                            <Smile size={"1.5rem"}
                                className="cursor-pointer text-gray-700 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400"
                                onClick={() => dispatch(setOpenEmojiPicker(!openEmojiPicker))}
                            />
                            {openEmojiPicker && <EmojiCustomPicker />}
                        </div>
                        <div className="pt-0.5">
                            <button
                                onClick={handleSendText}
                                disabled={isUploading || (!inputValue.trim() && selectedFiles.length === 0)}
                                className={` cursor-pointer rounded-full p-2 transition-colors ${isUploading
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-indigo-500 hover:bg-indigo-400 text-neutral-100"
                                    }`}
                            >
                                {isUploading
                                    ?
                                    <LoaderCircle
                                        role="status"
                                        aria-label="Loading"
                                        className={"animate-spin border-neutral-400 text-white"}
                                        size={"1.25rem"}
                                    />
                                    : <SendHorizonal size={"1.25rem"} />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!currentTarget) {
        return (

            <div className="overflow-auto flex flex-col h-full items-center justify-center bg-gray-50 relative">
                <Menu size={"2.0rem"}
                      onClick={props.onOpenMenu}
                      className="absolute top-4 left-4 lg:block p-3 bg-appchat-bluesky rounded-full shadow-md text-white active:bg-gray-100 hover:text-indigo-600 transition-colors"
                />
                <div className="text-center p-4">
                    <p className="text-xl font-semibold text-gray-700">Chào mừng đến với LongChat</p>
                    <p className="text-gray-500 mt-2">Nhấn vào nút Menu góc trái để bắt đầu cuộc trò chuyện.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="py-0 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-1 px-3 border border-gray-200 h-16">
                <div className="flex gap-3 items-center">
                    <ArrowLeft size={"1.5rem"}
                        onClick={props.onOpenMenu}
                        className="lg:hidden mr-1 text-gray-600 hover:text-black p-2 rounded-full active:bg-gray-200"
                    />
                    <div
                        className="w-12 h-12 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                        <User />
                    </div>
                    <div>
                        <p className="font-semibold text-lg">{currentTarget.name}</p>
                        <p>
                            {currentTarget.type === 1 && getRoomData?.userList &&
                                `${getRoomData.userList.length} thành viên`}
                        </p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Search size={"2.25rem"}
                        className="rounded p-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <Phone size={"2.25rem"}
                        className="rounded p-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400" />
                    <PanelRight
                        size={"2.25rem"}
                        className={`rounded p-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400 ${props.closeTabState && "bg-indigo-200 text-indigo-700"}`}
                        onClick={props.onCloseTab}
                    />
                </div>
            </div>
            {/* Main UI */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-1 w-full bg-gray-300/50 p-2">
                <div className="mt-auto" />

                {messages.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">Bắt đầu cuộc trò chuyện...</p>
                )}

                {messages.map((ele, index) => (
                    <Message
                        key={index}
                        rawMessage={ele.mes}
                        isOwner={ele.name === currentUser?.username}
                        username={ele.name}
                        time={formatSendTime(ele.createAt)}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            {/* Message */}
            <div className="mb-16 lg:mb-0">
                <ChatToolBar inputRef={textareaRef} />
                <SendMessageComponent />
            </div>
        </div>
    )
}

