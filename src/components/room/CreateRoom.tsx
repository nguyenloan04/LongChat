import {useEffect, useState} from "react";
import {WebsocketInstance} from "@/socket/WebsocketInstance.ts";
import {WebSocketEvent} from "@/socket/types/WebSoketMessage.ts";
import {setOpenCreateRoom} from "@/redux/slices/chatTriggerSlice.ts";
import {useDispatch} from "react-redux";
import {addNewUserToSidebar, setCurrentChatTarget, updateRoomHistory} from "@/redux/slices/chatSlice.ts";

export function CreateRoom() {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const wsInstance = WebsocketInstance.getInstance()
    const dispatch = useDispatch()

    const handleCreateRoom = () => {
        if (!name) {
            setError('Tên nhóm không được để trống!')
            return;
        }
        setLoading(true)
        wsInstance.send(WebSocketEvent.CREATE_ROOM, {
            name: name.trim(),
        })
    }

    useEffect(() => {
        const unsubscribe = wsInstance.subscribe(WebSocketEvent.CREATE_ROOM, (response) => {
            setLoading(false)
            if(response.status === "success") {
                console.log(response.data)
                dispatch(updateRoomHistory(response.data))
                
                const newChatTarget = {
                    name: response.data.name,
                    type: 1,
                    actionTime: new Date().toISOString(),
                }
                
                dispatch(addNewUserToSidebar(newChatTarget))
                dispatch(setCurrentChatTarget(newChatTarget))
                
                dispatch(setOpenCreateRoom(false))
            } else {
                setError(response.mes === 'Room Exist' ? "Đã tồn tại tên nhóm. Vui lòng đổi tên khác!" : "Đã có lỗi xảy ra!")
            }
        })
        return () => unsubscribe()
    }, []);

    return (
        <div className="fixed content-center inset-0 bg-neutral-700/50" onClick={() => dispatch(setOpenCreateRoom(false))}>
            <div className="p-4 border bg-white dark:bg-gray-800 mx-auto w-100 rounded-lg" onClick={(event) => event.stopPropagation()}>
                <div className="px-4 text-center pb-4">
                    <p className="text-lg font-semibold">Thêm nhóm mới</p>
                    <p className="text-red-500 text-sm">{error}</p>
                </div>

                <div className="flex justify-center items-center pb-4">
                    <label htmlFor="room-name" className="pe-2">Tên nhóm</label>
                    <input id="room-name" className="rounded-lg ms-2 px-2 h-10 flex-1 w-full border"
                           placeholder="Nhập tên nhóm..." maxLength={100} value={name} 
                           onChange={(event) => {
                               setName(event.target.value)
                               if(error) setError('')
                           }} required />
                </div>
                <div className="text-end">
                    <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg dark:bg-neutral-700/40 dark:hover:text-neutral-300
                        bg-gray-100 hover:bg-gray-100/50 hover:text-neutral-500 me-2" onClick={() => dispatch(setOpenCreateRoom(false))}>Hủy
                    </button>
                    <button className={`h-[2.5rem] p-2 rounded-lg
                        ${loading ? "bg-indigo-400 dark:bg-neutral-300/30" : "dark:bg-neutral-400/30 dark:hover:bg-neutral-300/30 bg-indigo-500 cursor-pointer hover:bg-indigo-400"} text-white`} disabled={loading} 
                        onClick={handleCreateRoom}
                    >{loading ? "Đang tạo nhóm" : "Tạo nhóm"}
                    </button>
                </div>
            </div>
        </div>
    )
}