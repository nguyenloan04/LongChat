import { useState } from "react";
import { ChatInterface } from "./ChatInterface";
import { ChatMenuBar } from "./ChatMenuBar";
import { ChatSideBar } from "./ChatSideBar";
import { RoomMenuBar } from "./RoomMenuBar";
import { DisplayAttachment } from "../common/DisplayAttachment";
import { useSelector } from "react-redux";
import type { ReduxState } from "@/constants/ReduxState";

export function MainChatUIComponent() {
    const viewAttachment = useSelector((state: ReduxState) => state.chatState.currentViewAttachment)
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    const listRoomAttachments = useSelector((state: ReduxState) => state.chatState.attachmentHistory)
    
    const [roomMenuState, setRoomMenuState] = useState(true)

    const roomAttachments = currentTarget ? listRoomAttachments[currentTarget.name] : []

    const closeTab = () => {
        setRoomMenuState(!roomMenuState)
    }
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="w-0 lg:w-100 flex">
                <div className="w-[15%]">
                    <ChatSideBar />
                </div>
                <div className="w-[85%] border">
                    <ChatMenuBar />
                </div>
            </div>
            <div className="w-full lg:flex-1">
                <ChatInterface closeTabState={roomMenuState} onCloseTab={closeTab} />
            </div>
            <div className={`border-l transition-all duration-300 ease-in-out ${roomMenuState ? `absolute lg:relative w-screen lg:opacity-100 lg:w-100` : 'w-0 opacity-0 pointer-events-none'}`}>
                <RoomMenuBar />
            </div>
            {viewAttachment.state && <DisplayAttachment index={viewAttachment.index} listAttachments={roomAttachments} />}
        </div>
    )
}