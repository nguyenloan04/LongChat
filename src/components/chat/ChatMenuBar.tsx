import { Cloud, MessageSquarePlus, Search, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState.ts";
import {
    getPeopleChatHistory,
    getUserList,
    setCurrentChatTarget,
    addNewUserToSidebar, getRoomChatHistory
} from "@/redux/slices/chatSlice.ts";
// Room
import RoomMenu from "@/components/room/RoomMenu.tsx";
import type { ReceiveMsgGetUserListPayload } from "@/socket/types/WebsocketReceivePayload.ts";

interface ChatMenuBarProps {
    onChatSelect?: () => void;
}
export function ChatMenuBar({ onChatSelect }: ChatMenuBarProps) {
    const dispatch = useDispatch();
    const [isInputFocused, setInputFocusState] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const isConnected = useSelector((state: any) => state.socketState.isConnected);

    const userList = useSelector((state: ReduxState) => state.chatState.userList);
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user)
    const roomHistory = useSelector((state: ReduxState) => state.chatState.roomHistory);
    // render user list
    useEffect(() => {
        if (isConnected) {
            dispatch(getUserList({}));
        } else {
            console.log("Waiting for socket connection...");
        }
    }, [dispatch, isConnected]);

    const handleSelectChat = (chat: ReceiveMsgGetUserListPayload) => {
        dispatch(setCurrentChatTarget(chat));

        if (chat.type === 0) {
            dispatch(getPeopleChatHistory({ name: chat.name, page: 1 }));
        } else {
            if (!roomHistory[chat.name]) {
                dispatch(getRoomChatHistory({ name: chat.name, page: 1 }));
            }
        }
        setSearchValue("");
        if (onChatSelect) {
            onChatSelect();
        }
    };
    // chat to new user

    const filteredUserList = userList.filter(u =>
        u.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );

    const isUserExistInList = userList.some(u =>
        u.name.toLowerCase() === searchValue.trim().toLowerCase()
    );
    const myUsername = useSelector((state: ReduxState) => state.currentUser.user?.username);
    const isSelf = searchValue.trim().toLowerCase() === myUsername?.toLowerCase();

    const handleCreateNewChat = () => {
        const targetName = searchValue.trim();
        if (!targetName) return;

        const newUser = {
            name: targetName,
            type: 0,
            actionTime: new Date().toISOString()
        };

        dispatch(addNewUserToSidebar(newUser));

        dispatch(setCurrentChatTarget(newUser));
        // for make sure never chatted before
        dispatch(getPeopleChatHistory({ name: targetName, page: 1 }));
        setSearchValue("");
    };
    return (
        <div className="h-full flex flex-col mb-12 lg:mb-0">
            {/* Header */}
            <div className="flex gap-2 justify-center items-center px-2 py-2 h-fit border-b min-h-16">
                <div
                    className={`w-full flex items-center gap-1 border rounded-md bg-gray-200/60 ${isInputFocused && "border border-neutral-500"}`}
                    onClick={() => setInputFocusState(true)}
                    onBlur={() => setInputFocusState(false)}
                >
                    <Search size={"1rem"} className="ms-3 me-1" />
                    <input
                        className="w-full py-2 focus:outline-0 bg-transparent"
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setInputFocusState(true)}
                        onBlur={() => setInputFocusState(false)}
                    />
                </div>
                <RoomMenu />
            </div>
            <div className="px-2 flex-1 overflow-y-auto">
                {/* Create new chat */}
                {searchValue && !isUserExistInList && !isSelf && (
                    <div
                        className="flex items-center gap-3 px-2 py-3 rounded-md my-2 cursor-pointer bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors border border-dashed border-indigo-300"
                        onClick={handleCreateNewChat}
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center shrink-0">
                            <MessageSquarePlus size="1.2rem" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium text-sm truncate">Nhắn tin cho "{searchValue}"</p>
                            <p className="text-xs opacity-70 truncate">Bắt đầu cuộc hội thoại mới</p>
                        </div>
                    </div>
                )}

                {/* Noti that no user found in userlist*/}
                {filteredUserList.length === 0 && !searchValue && (
                    <p className="text-center text-gray-400 mt-4">Chưa có tin nhắn nào</p>
                )}

                {filteredUserList.map((ele) => (
                    <div
                        key={ele.name}
                        className={`flex items-center gap-3 px-2 py-2 rounded-md my-2 cursor-pointer transition-colors ${currentTarget?.name === ele.name ? "bg-indigo-100" : "hover:bg-neutral-100"
                            }`}
                        onClick={() => handleSelectChat(ele)}
                    >
                        {/* Avatar Placeholder */}
                        <div className={`w-10 h-10 border rounded-full flex items-center justify-center shrink-0 ${ele.name === currentUser?.username ? "bg-blue-400" : "bg-neutral-200"}`}>
                            {ele.name === currentUser?.username ?
                                <Cloud size="1.2rem" className="text-white" fill={"white"} />
                                : <User size="1.2rem" className="text-gray-500" />
                            }
                        </div>

                        <div className="w-full overflow-hidden">
                            <div className="flex justify-between mb-1">
                                <p className="font-medium truncate max-w-[70%]">
                                    {ele.name === currentUser?.username ? "My Document" : ele.name}
                                </p>
                                <p className="text-neutral-500 text-xs shrink-0">
                                    {/*{formatSendTime(ele.actionTime)}*/}
                                    {ele.actionTime
                                        ? new Date(ele.actionTime)
                                            .toLocaleTimeString(
                                                "vi-VN",
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false,
                                                    ...(
                                                        new Date(ele.actionTime).toDateString() !== new Date(Date.now()).toDateString()
                                                        && {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour12: false,
                                                        }
                                                    )
                                                }
                                            )
                                        : ""
                                    }
                                </p>
                            </div>
                            <p className="text-neutral-500 text-sm truncate">
                                {ele.name === currentUser?.username ? "" : ele.type === 0 ? "Người dùng" : "Nhóm chat"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}