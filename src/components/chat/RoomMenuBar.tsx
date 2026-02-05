import type { ReduxState } from "@/constants/ReduxState";
import { ToastKeys } from "@/constants/ToastIcon";
import { setToastMessage } from "@/redux/slices/socketSlice";
import { getThumbnail } from "@/services/storageService";
import type { ReceiveMsgGetChatRoomPayload } from "@/socket/types/WebsocketReceivePayload";
import { generateInviteLink } from "@/utils/messageUtil";
import { ChevronDown, ChevronLeft, ChevronUp, Cloud, Copy, ImageOff, Share, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewAttachmentIndex } from "@/redux/slices/chatSlice";

export function RoomMenuBar({ setRoomMenuState }: { setRoomMenuState: (state: boolean) => void }) {
    const dispatcher = useDispatch()
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);
    const listRoomAttachments = useSelector((state: ReduxState) => state.chatState.attachmentHistory)
    const getRoomData = useSelector((state: ReduxState): ReceiveMsgGetChatRoomPayload | null => {
        if (!currentTarget) return null;
        if (currentTarget.type === 0) {
            return null
        } else {
            const roomData = state.chatState.roomHistory[currentTarget.name];
            return roomData
        }
    });
    //Local state
    const [memberState, setMemberState] = useState(false)
    const [attachmentState, setAttachmentState] = useState(false)

    const roomAttachments = currentTarget ? listRoomAttachments[currentTarget.name] : []

    if (!currentTarget) return null

    const inviteGroupLink = currentTarget && currentTarget.type === 1 ? generateInviteLink(currentTarget.name) : ""

    const handleCopy = async () => {
        if (!inviteGroupLink) return;
        try {
            await navigator.clipboard.writeText(inviteGroupLink);
            dispatcher(setToastMessage({ message: "Đã sao chép link mời", icon: ToastKeys.SUCCESS }))
        } catch (err) {
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="px-4 pt-4 lg:p-0 lg:hidden">
                <ChevronLeft
                    size={"1.75rem"}
                    className="cursor-pointer dark:text-white hover:text-neutral-400 dark:hover:text-neutral-500"
                    onClick={() => setRoomMenuState(false)}
                />
            </div>
            <div className="flex items-center justify-center flex-col gap-1 p-4">
                <div className={`w-18 h-18 rounded-full border p-2 flex justify-center items-center ${currentTarget.name === currentUser?.username ? "bg-blue-400 " : "bg-gray-150 border-black "}`}>
                    {currentTarget.name === currentUser?.username ?
                        <Cloud size="2.5rem" className="text-white" fill={"white"} />
                        : <User size="2.5rem" />
                    }
                </div>
                <p className="text-lg font-semibold">{currentTarget.name === currentUser?.username ? "My Document" : currentTarget.name}</p>
            </div>
            {/* Member */}
            <div className="px-2 overflow-y-auto">
                {getRoomData && currentTarget.type === 1 ?
                    <div className="my-1">
                        <div
                            className="cursor-pointer p-2 rounded-lg flex justify-between hover:bg-neutral-100 active:bg-neutral-200"
                            onClick={() => setMemberState(!memberState)}
                        >
                            <h5 className="font-semibold">Thành viên trong nhóm</h5>
                            {memberState ? <ChevronUp /> : <ChevronDown />}
                        </div>
                        {
                            memberState &&
                            <div className="flex flex-col overflow-y-auto h-40 border-b">
                                {getRoomData.userList && getRoomData.userList?.map(user => (
                                    <div className="rounded cursor-pointer flex gap-2 items-center hover:bg-neutral-200 p-1">
                                        <div className="my-1 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center bg-white shrink-0">
                                            <User size={"1rem"} />
                                        </div>
                                        <span>
                                            {`${user.name} ${currentUser?.username === user.name ? "(Bạn)" : ""}`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    : <></>
                }
                <div className="my-1">
                    <div
                        className="cursor-pointer p-2 rounded-lg flex justify-between hover:bg-neutral-100 active:bg-neutral-200"
                        onClick={() => setAttachmentState(!attachmentState)}
                    >
                        <h5 className="font-semibold">Ảnh & Video</h5>
                        {attachmentState ? <ChevronUp /> : <ChevronDown />}
                    </div>
                    {
                        attachmentState &&
                        <div className="mt-2">
                            {
                                roomAttachments.length === 0
                                    ? <div className="gap-3">
                                        <div className="flex flex-col items-center justify-center gap-2 h-40">
                                            <ImageOff size={"2rem"} className="text-neutral-500" />
                                            <p className="text-center text-neutral-500 text-sm">Không có ảnh & video được gửi</p>
                                        </div>
                                    </div>
                                    : <div className="grid grid-cols-4 gap-1 w-full max-h-47 overflow-y-auto">
                                        {roomAttachments.map((attachment, index) => (
                                            <div key={index} className="w-full aspect-square overflow-hidden rounded-lg">
                                                <img
                                                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                                    src={getThumbnail(attachment)}
                                                    alt={`attachment-${index}`}
                                                    onClick={() => {
                                                        dispatcher(setViewAttachmentIndex({
                                                            state: true,
                                                            index: index
                                                        }))
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                            }
                        </div>
                    }
                </div>
                {currentTarget.type === 1 &&
                    <div className="my-1 p-2">
                        <h5 className="font-semibold">Link tham gia nhóm</h5>
                        <div className="flex flex-1 truncate justify-between items-center gap-4">
                            <a
                                href={inviteGroupLink}
                                className="underline text-blue-500 hover:text-blue-400 active:text-blue-300 text-sm min-w-0"
                            >
                                <p className="truncate">{inviteGroupLink}</p>
                            </a>

                            <div className="flex gap-2 justify-end shrink-0">
                                <div
                                    className="cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 w-10 h-10 flex justify-center items-center"
                                    title="Sao chép"
                                    onClick={handleCopy}
                                >
                                    <Copy size={'1.25rem'} />
                                </div>
                                <div
                                    className="cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 w-10 h-10 flex justify-center items-center"
                                    title="Chia sẻ"
                                >
                                    <Share size={'1.25rem'} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}