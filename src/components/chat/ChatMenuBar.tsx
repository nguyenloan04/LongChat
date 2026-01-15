import getTimeDifference from "locale-time-diff"

import {Search, User} from "lucide-react"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {getPeopleChatHistory, getUserList, setCurrentChatTarget} from "@/redux/slices/chatPeopleSlice.ts";
// Room
import RoomMenu from "@/components/room/RoomMenu.tsx";


export function ChatMenuBar() {
    const dispatch = useDispatch();
    const [isInputFocused, setInputFocusState] = useState(false);

    const isConnected = useSelector((state: any) => state.socketState.isConnected);

    const userList = useSelector((state: ReduxState) => state.chatState.userList);
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    // render user list
    useEffect(() => {
        if (isConnected) {
            dispatch(getUserList({}));
        } else {
            console.log("Waiting for socket connection...");
        }
    }, [dispatch, isConnected]);

    const handleSelectUser = (user: any) => {
        dispatch(setCurrentChatTarget(user));

        if (user.type === 0) {
            dispatch(getPeopleChatHistory({ name: user.name, page: 1 }));
        } else {
            // TODO: Handle requestGetRoomHistory
            console.log("Selected a room, logic not implemented yet");
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex gap-2 justify-center items-center px-2 py-2 h-fit border-b min-h-16">
                <div
                    className={`flex items-center gap-1 border rounded-md bg-gray-200/60 ${isInputFocused && "border border-neutral-500"}`}
                    onClick={() => setInputFocusState(true)}
                    onBlur={() => setInputFocusState(false)}
                >
                    <Search size={"1rem"} className="ms-2 me-1" />
                    <input
                        className="w-full py-2 focus:outline-0"
                        type="text" placeholder="Tìm kiếm..."
                    />
                </div>
                <RoomMenu />
            </div>
            <div className="px-2 flex-1 overflow-y-auto">
                {userList.length === 0 && <p className="text-center text-gray-400 mt-4">Chưa có tin nhắn nào</p>}
                {userList.map((ele) => (
                    <div
                        key={ele.name}
                        className={`flex items-center gap-3 px-2 py-2 rounded-md my-2 cursor-pointer transition-colors ${
                            currentTarget?.name === ele.name ? "bg-indigo-100" : "hover:bg-neutral-100"
                        }`}
                        onClick={() => handleSelectUser(ele)}
                    >
                        {/* Avatar Placeholder */}
                        <div className="w-10 h-10 border rounded-full bg-neutral-200 flex items-center justify-center">
                            <User size="1.2rem" className="text-gray-500"/>
                        </div>

                        <div className="w-full overflow-hidden">
                            <div className="flex justify-between mb-1">
                                <p className="font-medium truncate max-w-[70%]">
                                    {ele.name}
                                </p>
                                <p className="text-neutral-500 text-xs shrink-0">
                                    {getTimeDifference(new Date(ele.actionTime)).text}
                                </p>
                            </div>
                            <p className="text-neutral-500 text-sm truncate">
                                {ele.type === 0 ? "Người dùng" : "Nhóm chat"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}