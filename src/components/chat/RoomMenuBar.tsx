import type { ReduxState } from "@/constants/ReduxState";
import { useToast } from "@/contexts/ToastContext";
import type { ReceiveMsgGetChatRoomPayload } from "@/socket/types/WebsocketReceivePayload";
import { generateInviteLink } from "@/utils/messageUtil";
import { ChevronDown, ChevronUp, CircleCheck, Copy, Settings, Share, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export function RoomMenuBar() {
    const currentTarget = useSelector((state: ReduxState) => state.chatState.currentChatTarget);
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);
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
    const [policyState, setPolicyState] = useState(false)

    const { showToast } = useToast()

    const handleCopy = async () => {
        if (!inviteGroupLink) return;
        try {
            await navigator.clipboard.writeText(inviteGroupLink);
            showToast("Đã sao chép link mời!", CircleCheck)
        } catch (err) {
        }
    };

    if (!currentTarget) return null

    const inviteGroupLink = currentTarget && currentTarget.type === 1 ? generateInviteLink(currentTarget.name) : ""

    //  const headerFeature = [
    //     {
    //         //Used room type in redux to decide
    //         name: "Thêm thành viên",
    //         icon: <UserPlus strokeWidth={1.5} size={"1.25rem"} />
    //     },
    //     {
    //         name: "Cài đặt",
    //         icon: <Settings strokeWidth={1.5} size={"1.25rem"} />
    //     }
    // ]

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-center flex-col gap-1 p-4">
                <div className="w-18 h-18 rounded-full border p-2 border-black bg-gray-150 flex justify-center items-center">
                    <User size={'2.5rem'} />
                </div>
                <p className="text-lg font-semibold">{currentTarget.name}</p>
                {/* <div className="mt-4 flex gap-1 justify-center items-start">
                    {headerFeature.map(ele => (
                        <div className="flex flex-col items-center w-24">
                            <div className="cursor-pointer bg-gray-200 hover:bg-gray-300 active:bg-gray-400 p-2.5 rounded-full border flex justify-center items-center">
                                {ele.icon}
                            </div>
                            <p className="text-xs text-center mt-1">
                                {ele.name}
                            </p>
                        </div>
                    ))}
                </div> */}
            </div>
            {/* Temp */}
            {/* Member */}
            <div className="px-2">
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
                            <div className="flex flex-col overflow-y-auto max-h-40 border-b">
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
                    <div className="p-2 rounded-lg flex justify-between hover:bg-neutral-100 active:bg-neutral-200">
                        <h5 className="font-semibold">Ảnh & Video</h5>
                        <ChevronDown />
                    </div>
                    {/* <div className="gap-3">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <ImageOff size={"2rem"} className="text-neutral-500" />
                            <p className="text-center text-neutral-500 text-sm">Không có ảnh & video được gửi</p>
                        </div>
                    </div> */}
                </div>
                <div className="my-1">
                    <div className="p-2 rounded-lg flex justify-between hover:bg-neutral-100 active:bg-neutral-200">
                        <h5 className="font-semibold">File</h5>
                        <ChevronDown />
                    </div>
                    {/* <div className="gap-3">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <FileX2 size={"2rem"} className="text-neutral-500" />
                            <p className="text-center text-neutral-500 text-sm">Không có file được gửi</p>
                        </div>
                    </div> */}
                </div>
                <div className="my-1">
                    <div className="p-2 rounded-lg flex justify-between hover:bg-neutral-100 active:bg-neutral-200">
                        <h5 className="font-semibold">Quyền riêng tư & hỗ trợ</h5>
                        <ChevronDown />
                    </div>
                </div>
                <div className="my-1 p-2">
                    <h5 className="font-semibold">Link tham gia nhóm</h5>
                    <div className="flex flex-1 truncate justify-between items-center gap-4">
                        <a
                            href="https://localhost:5713/g/group77"
                            className="underline text-blue-500 hover:text-blue-400 active:text-blue-300 text-sm min-w-0"
                        >
                            <p className="truncate">
                                https://localhost:5713/g/group77
                            </p>
                        </a>

                        <div className="flex gap-2 justify-end shrink-0">
                            <div
                                className="cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 w-10 h-10 flex justify-center items-center"
                                title="Sao chép"
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
            </div>
        </div >
    )
}