import {setOpenJoinRoom} from "@/redux/slices/chatTriggerSlice.ts";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {WebsocketInstance} from "@/socket/WebsocketInstance.ts";
import {WebSocketEvent} from "@/socket/types/WebSoketMessage.ts";
import {setRoomChat} from "@/redux/slices/chatSlice.ts";

export default function JoinRoom () {
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const dispatch = useDispatch();
    const wsInstance = WebsocketInstance.getInstance()
    const [loading, setLoading] = useState<boolean>(false);
    
    const handleJoinRoom = () => {
        if(!name) {
            setError("Tên nhóm không được để trống!")
            return;
        }
        setLoading(true);
        wsInstance.send(WebSocketEvent.JOIN_ROOM, {
            name: name,
        })
    }
    
    useEffect(() => {
        const unsubscribe = wsInstance.subscribe(WebSocketEvent.JOIN_ROOM, (response) => {
            setLoading(false);
            if(response.status === "success") {
                console.log(response.data)
                dispatch(setRoomChat(response.data))
                dispatch(setOpenJoinRoom(false)) 
            } else {
                setError(response.mes === "Room not found" ? "Không tìm thấy nhóm. Vui lòng đổi tên khác!" : "Đã có lỗi xảy ra!")
            }
        })
        return () => unsubscribe()
    }, [])
    
    return (
        <div className="fixed content-center inset-0 bg-neutral-700/50"
             onClick={() => dispatch(setOpenJoinRoom(false))}>
            <div className="p-4 border bg-white dark:bg-gray-800 mx-auto w-100 rounded-lg" onClick={(event) => event.stopPropagation()}>
                <div className="px-4 text-center pb-4">
                    <p className="text-lg font-semibold">Tham gia nhóm</p>
                    <p className="text-red-500 text-sm">{error}</p>
                </div>

                <div className="flex justify-center items-center pb-4">
                    <label htmlFor="room-name" className="pe-2">Tên nhóm</label>
                    <input id="room-name" className="rounded-lg ms-2 px-2 h-10 flex-1 w-full border"
                           placeholder="Nhập tên nhóm..." maxLength={100} value={name}
                           onChange={(event) => {
                               setName(event.target.value)
                               if (error) setError('')
                           }} required/>
                </div>
                <div className="text-end">
                    <button className="h-[2.5rem] cursor-pointer p-2 rounded-lg dark:bg-neutral-700/40 dark:hover:text-neutral-300
                        bg-gray-100 hover:bg-gray-100/50 hover:text-neutral-500 me-2"
                            onClick={() => dispatch(setOpenJoinRoom(false))}>Hủy
                    </button>
                    <button className={`h-[2.5rem] p-2 rounded-lg
                        ${loading ? "bg-indigo-400 dark:bg-neutral-300/30" : "dark:bg-neutral-400/30 dark:hover:bg-neutral-300/30 bg-indigo-500 cursor-pointer hover:bg-indigo-400"} text-white`} disabled={loading}
                            onClick={handleJoinRoom}
                    >{loading ? "Đang tham gia" : "Tham gia"}
                    </button>
                </div>
            </div>
        </div>

    )
}