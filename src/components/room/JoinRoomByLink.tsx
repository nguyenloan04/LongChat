import type { ReduxState } from "@/constants/ReduxState"
import { addNewUserToSidebar, setCurrentChatTarget, updateRoomHistory } from "@/redux/slices/chatSlice"
import { WebSocketEvent } from "@/socket/types/WebSoketMessage"
import { WebsocketInstance } from "@/socket/WebsocketInstance"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ConnectionLoading } from "../common/ConnectionLoading"
import { CircleCheckBig, TriangleAlert } from "lucide-react"

export function JoinRoomByLink() {
    const [message, setMessage] = useState("")
    const [error, setError] = useState('');
    const { roomName } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state: ReduxState) => state.currentUser.user);
    const wsInstance = WebsocketInstance.getInstance()

    useEffect(() => {
        const unsubscribe = wsInstance.subscribe(WebSocketEvent.JOIN_ROOM, (response) => {
            if (response.status === "success") {
                dispatch(updateRoomHistory(response.data))
                const newChatTarget = {
                    name: response.data.name,
                    type: 1,
                    actionTime: new Date().toISOString(),
                }

                dispatch(addNewUserToSidebar(newChatTarget))
                dispatch(setCurrentChatTarget(newChatTarget))
                setMessage("Tham gia nhóm thành công!")
                setTimeout(() => {
                    navigate("/chat")
                }, 1000)
            }
            else {
                setError(response.mes === "Room not found" ? "Không tìm thấy nhóm!" : "Đã có lỗi xảy ra!")
            }
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (!roomName) return
            if (!currentUser || !localStorage.getItem("user")) navigate("/")

            wsInstance.send(WebSocketEvent.JOIN_ROOM, {
                name: roomName.trim()
            })
        }, 1000)
    }, [roomName])

    return (
        error
            ?
            <div className="w-screen h-screen absolute top-0 left-0 z-100 bg-white dark:bg-gray-900 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <TriangleAlert className="size-12" />
                    <p className="text-xl mt-4">{error}</p>
                </div>
            </div>
            : message ?
                <div className="w-screen h-screen absolute top-0 left-0 z-100 bg-white dark:bg-gray-900 flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <CircleCheckBig className="size-12" />
                        <p className="text-xl mt-4">{message}</p>
                    </div>
                </div>
                : <ConnectionLoading message="Đang xử lý lời mời" />
    )
}