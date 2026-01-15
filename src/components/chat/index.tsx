import { useState } from "react";
import { ChatInterface } from "./ChatInterface";
import { ChatMenuBar } from "./ChatMenuBar";
import { ChatSideBar } from "./ChatSideBar";
import { RoomMenuBar } from "./RoomMenuBar";

export function MainChatUIComponent() {
    const [roomMenuState, setRoomMenuState] = useState(true)

    const closeTab = () => {
        setRoomMenuState(!roomMenuState)
    }
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="w-100 flex">
                <div className="w-[15%]">
                    <ChatSideBar />
                </div>
                <div className="w-[85%] border">
                    <ChatMenuBar />
                </div>
            </div>
            <div className="flex-1">
                <ChatInterface closeTabState={roomMenuState} onCloseTab={closeTab} />
            </div>
            <div className={`border-l transition-all duration-300 ease-in-out ${roomMenuState ? `w-100` : 'w-0 opacity-0 pointer-events-none'}`}>
                <RoomMenuBar />
            </div>
        </div>
    )
}