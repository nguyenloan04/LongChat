import { Group } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState.ts";
import { CreateRoom } from "@/components/room/CreateRoom.tsx";
import { setOpenCreateRoom, setOpenJoinRoom } from "@/redux/slices/chatTriggerSlice.ts";
import JoinRoom from "@/components/room/JoinRoom.tsx";
import { useState } from "react";

export default function RoomMenu() {
    const openCreateRoom = useSelector((state: ReduxState) => state.chatTriggerSlice.openCreateRoom)
    const openJoinRoom = useSelector((state: ReduxState) => state.chatTriggerSlice.openJoinRoom)
    const [openMenuItem, setOpenMenuItem] = useState<boolean>(false)
    const dispatch = useDispatch();

    return (<>
        <div className={`${openMenuItem && "bg-neutral-300/30"} p-2 rounded-lg`}
            onMouseEnter={() => setOpenMenuItem(true)} onMouseLeave={() => setOpenMenuItem(false)}>
            <Group />
            <div
                className={`top-13 p-1 absolute bg-white dark:bg-gray-800 overflow-hidden rounded shadow ${!openMenuItem && "hidden"}`}
            >
                <ul className="w-40">
                    <li className="text-sm rounded transition-all duration-300 hover:px-5 cursor-pointer hover:bg-neutral-300/40 py-2 px-4" onClick={() => dispatch(setOpenCreateRoom(true))}>Tạo nhóm</li>
                    <li className="text-sm rounded transition-all duration-300 hover:px-5 cursor-pointer hover:bg-neutral-300/40 py-2 px-4" onClick={() => dispatch(setOpenJoinRoom(true))}>Tham gia nhóm</li>
                </ul>
            </div>
        </div>
        {openCreateRoom && <CreateRoom />}
        {openJoinRoom && <JoinRoom />}
    </>
    )
}