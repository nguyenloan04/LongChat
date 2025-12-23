import { ChatInterface } from "./ChatInterface";
import { ChatMenuBar } from "./ChatMenuBar";
import { RoomMenuBar } from "./RoomMenuBar";

export function MainChatUIComponent() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-[20rem]">
                <ChatMenuBar />
            </div>
            <div className="flex-1">
                <ChatInterface />
            </div>
            <div className="w-[30rem]">
                <RoomMenuBar />
            </div>
        </div>
    )
}