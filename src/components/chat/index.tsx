import { ChatInterface } from "./ChatInterface";
import { ChatMenuBar } from "./ChatMenuBar";
import { ChatSideBar } from "./ChatSideBar";
import { RoomMenuBar } from "./RoomMenuBar";

export function MainChatUIComponent() {
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="w-[25rem] flex">
                <div className="w-[15%]">
                    <ChatSideBar />
                </div>
                <div className="w-[85%] border">
                    <ChatMenuBar />
                </div>
            </div>
            <div className="flex-1">
                <ChatInterface />
            </div>
            <div className="w-[25rem]">
                <RoomMenuBar />
            </div>
        </div>
    )
}