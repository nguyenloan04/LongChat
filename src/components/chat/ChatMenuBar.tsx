import getTimeDifference from "locale-time-diff"
import {Search, User} from "lucide-react"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {getPeopleChatHistory, getUserList, setCurrentChatTarget} from "@/redux/slices/chatPeopleSlice.ts";

export function ChatMenuBar() {
    // const [isInputFocused, setInputFocusState] = useState(false)
    // const [groupIndex, setGroupIndex] = useState(-1)
    //
    // const mockGroupData = [
    //     {
    //         name: "Nhóm 77",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Làm bài cũ chưa mà học???",
    //         lastSender: "",
    //         time: new Date(new Date().getTime() - 60 * 60 * 1000)
    //     },
    //     {
    //         name: "group_test",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Initial message",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 11 * 1000)
    //     },
    //     {
    //         name: "Hội ra trường đúng hạn",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Hello World",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 120 * 1000)
    //     },
    //     {
    //         name: "Hội con người",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Nhắn j đi chứ!!!",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 5 * 1000)
    //     },
    //     {
    //         name: "Nhóm 77",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Làm bài cũ chưa mà học???",
    //         lastSender: "",
    //         time: new Date(new Date().getTime() - 60 * 60 * 1000)
    //     },
    //     {
    //         name: "group_test",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Initial message",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 11 * 1000)
    //     },
    //     {
    //         name: "Hội ra trường đúng hạn",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Hello World",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 120 * 1000)
    //     },
    //     {
    //         name: "Hội con người",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Nhắn j đi chứ!!!",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 5 * 1000)
    //     },
    //     {
    //         name: "Nhóm 77",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Làm bài cũ chưa mà học???",
    //         lastSender: "",
    //         time: new Date(new Date().getTime() - 60 * 60 * 1000)
    //     },
    //     {
    //         name: "group_test",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Initial message",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 11 * 1000)
    //     },
    //     {
    //         name: "Hội ra trường đúng hạn",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Hello World",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 120 * 1000)
    //     },
    //     {
    //         name: "Hội con người",
    //         avatar: "/src/assets/group-avt.png",
    //         lastMsg: "Nhắn j đi chứ!!!",
    //         lastSender: "Người dùng 10",
    //         time: new Date(new Date().getTime() - 60 * 5 * 1000)
    //     }
    // ]
    const dispatch = useDispatch();
    const [isInputFocused, setInputFocusState] = useState(false);

    const userList = useSelector((state: ReduxState) => state.chatState.userList);
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);

    useEffect(() => {
        dispatch(getUserList({}));
    }, [dispatch]);

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
            <div className="px-2 py-2 h-fit border-b min-h-16">
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
            </div>
            {/* Body */}
            {/*<div className="px-2 flex-1 overflow-y-auto">*/}
            {/*    {mockGroupData.map((ele, index) => (*/}
            {/*        <div*/}
            {/*            className={`flex items-center gap-3 px-2 py-2 rounded-md my-2 ${groupIndex === index ? "bg-indigo-100 hover:bg-indigo-100" : "hover:bg-neutral-100"}`}*/}
            {/*            onClick={() => setGroupIndex(index)}*/}
            {/*        >*/}
            {/*            <img*/}
            {/*                src={ele.avatar} alt=""*/}
            {/*                className="w-10 h-10 border rounded-full bg-neutral-200"*/}
            {/*            />*/}
            {/*            <div className="w-full">*/}
            {/*                <div className="flex justify-between mb-1">*/}
            {/*                    <p className="font-medium">*/}
            {/*                        {ele.name}*/}
            {/*                    </p>*/}
            {/*                    <p className="text-neutral-500 text-xs">*/}
            {/*                        {getTimeDifference(ele.time).text}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*                <p className="text-neutral-500 text-sm">*/}
            {/*                    {ele.lastSender ? ele.lastSender + ":" : ele.lastSender} {ele.lastMsg}*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <div className="px-2 flex-1 overflow-y-auto">
                {userList.length === 0 && <p className="text-center text-gray-400 mt-4">Chưa có tin nhắn nào</p>}

                {userList.map((ele, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 px-2 py-2 rounded-md my-2 cursor-pointer ${
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