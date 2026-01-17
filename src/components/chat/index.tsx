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
    const [roomMenuState, setRoomMenuState] = useState(false)
    const [chatMenuState, setChatMenuState] = useState(true)

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
                    z-40 lg:flex w-0 lg:w-[15%]`
                }>
                    <ChatSideBar />
                </div>

                <div
                    className={`
                        w-full lg:w-[85%] border-r
                        fixed bg-white top-0 bottom-16 z-50
                        border-l transition-all duration-300 ease-in-out transform shadow-xl lg:shadow-none
                        ${chatMenuState
                            ? "w-full translate-x-0 opacity-100"
                            : "w-full translate-x-full opacity-0 pointer-events-none"
                        }
                        lg:relative lg:translate-x-0
                        ${chatMenuState
                            ? "lg:w-100 lg:opacity-100"
                            : "lg:w-0 lg:opacity-0 lg:overflow-hidden lg:border-none"
                        }
                    `}
                >
                    <ChatMenuBar onChatSelect={() => {
                        setChatMenuState(false)
                    }}
                    />
                </div>
            </div>
            <div className={`
                w-full lg:flex lg:flex-1 z-0
            `}>
                <ChatInterface
                    closeTabState={roomMenuState}
                    onCloseTab={closeTab}
                    onOpenMenu={() => setChatMenuState(true)}
                    onOpenMenuBar={() => setChatMenuState(true)}
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