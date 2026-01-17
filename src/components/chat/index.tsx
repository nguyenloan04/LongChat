import  {useState} from "react";
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
    const [menuState, setMenuState] = useState(false);
    const [roomMenuState, setRoomMenuState] = useState(false)

    const roomAttachments = currentTarget ? listRoomAttachments[currentTarget.name] : []

    const closeTab = () => {
        setRoomMenuState(!roomMenuState)
    }

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className={`
                lg:flex lg:w-[400px] h-full transition-all duration-300
            `}>
                <div className={`
                    ${!menuState ? 'flex w-full z-40' : 'hidden'} 
                    w-0 lg:w-[15%] z-10`
                }>
                    <ChatSideBar />
                </div>

                <div className="w-full lg:w-[85%] border-r h-full relative bg-white">
                    <ChatMenuBar onChatSelect={() => setMenuState(false)} />
                </div>
            </div>
            <div className={`
                ${menuState ? 'hidden' : 'flex'} 
                w-full lg:flex lg:flex-1 h-full z-0
            `}>
                <ChatInterface
                    closeTabState={roomMenuState}
                    onCloseTab={closeTab}
                    // Bấm nút Menu -> Set true để mở list
                    onOpenMenu={() => setMenuState(true)}
                />
            </div>
            <div className={`
                fixed bg-white h-full inset-y-0 z-50
                border-l transition-all duration-300 ease-in-out transform shadow-xl lg:shadow-none
                ${roomMenuState
                ? "w-full translate-x-0 opacity-100"
                : "w-full translate-x-full opacity-0 pointer-events-none"
            }
                lg:relative lg:translate-x-0 
                ${roomMenuState
                ? "lg:w-100 lg:opacity-100"
                : "lg:w-0 lg:opacity-0 lg:overflow-hidden lg:border-none"
            }
            `}>
                <RoomMenuBar setRoomMenuState={setRoomMenuState} />
            </div>
            {viewAttachment.state && <DisplayAttachment index={viewAttachment.index} listAttachments={roomAttachments} />}
        </div>
    )
}