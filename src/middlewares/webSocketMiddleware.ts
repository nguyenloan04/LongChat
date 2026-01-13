import type { User } from "@/constants/User";
import { setConnected, setErrorMessage } from "@/redux/slices/socketSlice";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { WebsocketInstance } from "@/socket/WebsocketInstance";
import { WebSocketEvent } from "@/socket/types/WebSoketMessage";
import { forceLogout } from "@/utils/authUtil";
import type { Middleware } from "@reduxjs/toolkit";
import type { WsReceiveMessage } from "@/socket/types/WebSocketMessageReceive";
import type { ReceiveMsgGetChatPeoplePayload } from "@/socket/types/WebsocketReceivePayload";
import type { SendMsgGetChatPayload, SendMsgSendChatPayload } from "@/socket/types/WebsocketSendPayload";

import {
    setPeopleChatHistory,
    receiveNewPeopleMessage,
    getPeopleChatHistory,
    sendPeopleChat
} from "@/redux/slices/chatPeopleSlice";

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
            // const data = response.data
            //Insert action into store.dispatch()
            // store.dispatch()
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_ROOM, (response) => {
        if (response.status === "success") {
            // const data = response.data
            //Check does message come from owner here
            //Insert action into store.dispatch()
            // store.dispatch()
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_PEOPLE, (response) => {
        if (response.status === "success") {
            const message = response.data as unknown as ReceiveMsgGetChatPeoplePayload;

            const state = store.getState();
            const myUsername = state.currentUser.currentUser?.username;

            if (message && message.mes && myUsername) {
                let targetName = message.name;
                if (message.name === myUsername) {
                    targetName = message.to;
                }
                store.dispatch(receiveNewPeopleMessage({ targetName, message }));
            }
        }
    })
    ws.subscribe(WebSocketEvent.GET_PEOPLE_CHAT_MES, (response: WsReceiveMessage<WebSocketEvent.GET_PEOPLE_CHAT_MES>) => {
        if (response.status === "success") {
            const messages = response.data; // Type: ReceiveMsgGetChatPeoplePayload[]

            const state = store.getState();
            const currentUser = state.currentUser.currentUser as User;
            const myUsername = currentUser?.username;

            if (messages && messages.length > 0 && myUsername) {
                const firstMsg = messages[0];
                let targetName = "";

                if (firstMsg.name === myUsername) {
                    targetName = firstMsg.to;
                } else {
                    targetName = firstMsg.name;
                }

                store.dispatch(setPeopleChatHistory({ targetName, messages }));
            }
        }
    })

    return (next) => (action: any) => {
        switch (action.type) {
            case sendPeopleChat.type: {
                const payload = action.payload as SendMsgSendChatPayload;

                ws.send(WebSocketEvent.SEND_CHAT_TO_PEOPLE, { ...payload, type: 'people' });
                break;
            }

            case getPeopleChatHistory.type: {
                const payload = action.payload as SendMsgGetChatPayload;
                ws.send(WebSocketEvent.GET_PEOPLE_CHAT_MES, payload);
                break;
            }
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
        }

        return next(action)
    }
}
