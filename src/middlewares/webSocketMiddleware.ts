import type { User } from "@/constants/User";
import { setConnected, setErrorMessage } from "@/redux/slices/socketSlice";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { WebsocketInstance } from "@/socket/WebsocketInstance";
import { WebSocketEvent } from "@/socket/types/WebSoketMessage";
import { forceLogout } from "@/utils/authUtil";
import type { Middleware } from "@reduxjs/toolkit";
import {
    getRoomChatMessage,
    receiveNewMessageFromRoom,
    sendMessageToRoom,
    updateRoomHistory
} from "@/redux/slices/chatSlice.ts";
import type {ChatDataRoom} from "@/socket/types/WebsocketReceivePayload.ts";

const RECONNECT_TIMEOUT = 180000 // Timeout 3 mins for reconnect
const RECONNECT_INTERVAL = 500 //Reconnect every 0.5s

export const socketMiddleware: Middleware = (store) => {
    const ws = WebsocketInstance.getInstance()
    let serverErrorState = false

    ws.onInitConnection = () => {
        store.dispatch(setConnected(true))
    }

    ws.onConnectionLost = (code) => {
        switch (code) {
            //Connection closed from connection error or timeout
            case 1006: {
                ws.connect()
                store.dispatch({ type: 'socket/requestRelogin' })
                break
            }
            //Server error
            case 1011: {

                break
            }
        }
    }

    ws.onServerError = () => {
        store.dispatch(setErrorMessage("Server đang gặp lỗi, hãy quay lại sau"))
        if (!serverErrorState) {
            serverErrorState = true
        }
    }

    //For relogin when disconnect
    ws.subscribe(WebSocketEvent.RE_LOGIN, (response) => {
        if (response.status === "success") {
            //Notice here            
        }
        else {
            //Re login failed, end session and require login
            localStorage.removeItem("RE_LOGIN_CODE")
            store.dispatch(setCurrentUser(null))
        }
    })

    //Global state
    ws.subscribe(WebSocketEvent.GET_ROOM_CHAT_MES, (response) => {
        if (response.status === "success") {
            const message = response.data
            store.dispatch(updateRoomHistory({
                target: message.name,
                value: message
            }))
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_ROOM, (response) => {
        if (response.status === "success") {
            const message = response.data as unknown as ChatDataRoom;
            const target = message.to;
            const state = store.getState();

            const currentRoom = state.chatSlice.roomHistory[target];
            if (!currentRoom || currentRoom.userList.length === 0) {
                ws.send(WebSocketEvent.GET_ROOM_CHAT_MES, {
                    name: target,
                    page: 1
                });
            }

            store.dispatch(receiveNewMessageFromRoom({
                target: target,
                value: message
            }));
        }
    });

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_PEOPLE, (response) => {
        if (response.status === "success") {
            // const data = response.data
            //Check does message come from owner here
            //Insert action into store.dispatch()
            // store.dispatch()
        }
    })

    return (next) => (action: any) => {
        switch (action.type) {
            case 'socket/requestRelogin': {
                try {
                    serverErrorState = false
                    
                    const reloginCode = localStorage.getItem("RE_LOGIN_CODE")
                    const state = store.getState()
                    const currentUser: User = state.currentUser.currentUser as User


                    if (!reloginCode || !currentUser) {
                        forceLogout(store)
                        break
                    }

                    let currentTimeout = 0
                    const reconnectInterval = setInterval(() => {
                        if (ws.getSocket?.readyState === WebSocket.OPEN) {
                            ws.send(WebSocketEvent.RE_LOGIN, {
                                code: reloginCode,
                                user: currentUser.username
                            })
                            clearInterval(reconnectInterval)
                        }

                        if (currentTimeout >= RECONNECT_TIMEOUT) {
                            clearInterval(reconnectInterval)
                            forceLogout(store)
                        }

                        if (serverErrorState) {
                            clearInterval(reconnectInterval)
                        }

                        currentTimeout += RECONNECT_INTERVAL
                    }, RECONNECT_INTERVAL)
                }
                catch (_) {
                    forceLogout(store)
                }
                break
            }
            case sendMessageToRoom.type: {
                const { roomName, message } = action.payload;
                if (ws.getSocket?.readyState === WebSocket.OPEN) {
                    ws.send(WebSocketEvent.SEND_CHAT_TO_ROOM, {
                        type: "room",
                        to: roomName,
                        mes: JSON.stringify(message)
                    });
                }
                break;
            }
            case getRoomChatMessage.type: {
                const { roomName, page } = action.payload;
                if (ws.getSocket?.readyState === WebSocket.OPEN) {
                    ws.send(WebSocketEvent.GET_ROOM_CHAT_MES, {
                        name: roomName,
                        page: page
                    });
                }
                break;
            }
        }

        return next(action)
    }
}