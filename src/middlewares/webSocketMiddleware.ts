import type {User} from "@/constants/User";
import {setConnected, setErrorMessage} from "@/redux/slices/socketSlice";
import {setCurrentUser} from "@/redux/slices/userSlice";
import {WebsocketInstance} from "@/socket/WebsocketInstance";
import {WebSocketEvent} from "@/socket/types/WebSoketMessage";
import {forceLogout} from "@/utils/authUtil";
import type {Middleware} from "@reduxjs/toolkit";
import type {WsReceiveMessage} from "@/socket/types/WebSocketMessageReceive";
import type {
    ReceiveMsgGetChatPeoplePayload, ReceiveMsgSendChatRoomPayload
} from "@/socket/types/WebsocketReceivePayload";
import type {
    SendMsgGetChatPayload,
    SendMsgGetUserListPayload,
    SendMsgSendChatPayload
} from "@/socket/types/WebsocketSendPayload";

import {
    setUserList,
    setPeopleChatHistory,
    updateRoomHistory,
    receiveNewPeopleMessage,
    getPeopleChatHistory,
    getRoomChatHistory,
    sendPeopleChat,
    getUserList, receiveNewMessageFromRoom, sendMessageToRoom
} from "@/redux/slices/chatSlice";

const RECONNECT_TIMEOUT = 180000 // Timeout 3 mins for reconnect
const RECONNECT_INTERVAL = 500 //Reconnect every 0.5s

export const socketMiddleware: Middleware = (store) => {
    const ws = WebsocketInstance.getInstance()
    let serverErrorState = false
    let reconnectInterval: ReturnType<typeof setInterval> | undefined = undefined

    const clearReconnectInterval = () => {
        if (reconnectInterval) {
            clearInterval(reconnectInterval)
            reconnectInterval = undefined
        }
    }

    ws.onInitConnection = () => {
        store.dispatch(setConnected(true))
        //Auto login if possible
        const reloginCode = localStorage.getItem("RE_LOGIN_CODE")
        const state = store.getState()
        const rawUser = localStorage.getItem("user")
        const user: User = rawUser ? JSON.parse(rawUser) as User : state.currentUser.user

        if (reloginCode && user) {
            ws.send(WebSocketEvent.RE_LOGIN, {
                code: reloginCode,
                user: user.username
            })
        }
        else {
            // store.dispatch(setConnected(false))
        }
    }

    ws.onConnectionLost = (code) => {
        store.dispatch(setConnected(false))
        switch (code) {
            //Connection closed from connection error or timeout
            case 1006: {
                ws.connect()
                store.dispatch({type: 'socket/requestRelogin'})
                break
            }
            //Server error
            case 1001: {
                forceLogout(store)
                break
            }
        }
    }

    ws.onServerError = () => {
        store.dispatch(setErrorMessage("Server đang gặp lỗi, hãy quay lại sau"))
        serverErrorState = true
        clearReconnectInterval()
    }

    //For relogin when disconnect
    ws.subscribe(WebSocketEvent.RE_LOGIN, (response) => {
        if (response.status === "success") {
            //Notice here
            localStorage.setItem("RE_LOGIN_CODE", response.data.RE_LOGIN_CODE)
        }
        else {
            //Re login failed, end session and require login
            store.dispatch(setCurrentUser(null))
            if ((response as any).event === "ACTION_NOT_EXIT") return
            localStorage.removeItem("RE_LOGIN_CODE")
            localStorage.removeItem("user")
        }
    })

    //Global state
    ws.subscribe(WebSocketEvent.GET_ROOM_CHAT_MES, (response) => {
        if (response.status === "success") {
            const message = response.data
            store.dispatch(updateRoomHistory(message))
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_ROOM, (response) => {
        if (response.status === "success") {
            const message = response.data as unknown as ReceiveMsgSendChatRoomPayload;
            const target = message.to;
            const state = store.getState();

            const currentRoom = state.chatState.roomHistory[target];
            if (!currentRoom) {
                 store.dispatch(getRoomChatHistory({
                    name: target,
                    page: 1
                }))
            } else {
                store.dispatch(receiveNewMessageFromRoom(message));
            }
            if(!(state.chatState.userList[0].name === target && state.chatState.userList[0].type === message.type)) {
                store.dispatch(getUserList({}))
            }
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_PEOPLE, (response) => {
        if (response.status === "success") {
            const message = response.data as unknown as ReceiveMsgGetChatPeoplePayload;

            const state = store.getState();
            const rawUsername = state.currentUser.user?.username  || "";
            const myUsername = rawUsername.trim();

            if (message && message.mes && myUsername) {
                let targetName = "";

                if (message.name.trim() === myUsername) {
                    targetName = message.to;
                } else {
                    targetName = message.name;
                }


                store.dispatch(receiveNewPeopleMessage({ targetName, message }));

            } else {
                console.warn(" Error");
            }
        }
    })
    ws.subscribe(WebSocketEvent.GET_PEOPLE_CHAT_MES, (response: WsReceiveMessage<WebSocketEvent.GET_PEOPLE_CHAT_MES>) => {
        if (response.status === "success") {
            const messages = response.data;
            // const state = store.getState();
            const state = store.getState();
            let username = state.currentUser.user?.username;

            if (!username) {
                const rawUser = localStorage.getItem("user")
                const user: User = rawUser ? JSON.parse(rawUser) as User : state.currentUser.user
                username = user.username || undefined;
            }


            if (messages && messages.length > 0 && username) {
                const firstMsg = messages[0];
                let targetName = "";

                if (firstMsg.name === username) {
                    targetName = firstMsg.to;
                } else {
                    targetName = firstMsg.name;
                }

                // Dispatch action lưu vào Redux Store
                store.dispatch(setPeopleChatHistory({targetName, messages}));
            }
        }
    })
    ws.subscribe(WebSocketEvent.GET_USER_LIST, (response: WsReceiveMessage<WebSocketEvent.GET_USER_LIST>) => {
        if (response.status === "success") {
            const userList = response.data;
            store.dispatch(setUserList(userList));
        }
    })

    return (next) => (action: any) => {
        switch (action.type) {
            case getUserList.type: {
                const payload = action.payload as SendMsgGetUserListPayload;
                ws.send(WebSocketEvent.GET_USER_LIST, payload);
                break;
            }
            case sendPeopleChat.type: {
                const payload = action.payload as SendMsgSendChatPayload;

                ws.send(WebSocketEvent.SEND_CHAT_TO_PEOPLE, {...payload, type: 'people'});

                setTimeout(() => {

                    store.dispatch(getUserList({}));

                    store.dispatch(getPeopleChatHistory({
                        name: payload.to,
                        page: 1
                    }));

                }, 3000);

                break;
            }

            case getPeopleChatHistory.type: {
                const payload = action.payload as SendMsgGetChatPayload;
                ws.send(WebSocketEvent.GET_PEOPLE_CHAT_MES, payload);
                break;
            }
            case 'socket/requestRelogin': {
                try {
                    clearReconnectInterval()
                    serverErrorState = false

                    const reloginCode = localStorage.getItem("RE_LOGIN_CODE")
                    const username = (JSON.parse(<string>localStorage.getItem("user")) as User)?.username
                    const state = store.getState()

                    const currentUser: User = state.currentUser.user as User

                    if (!reloginCode || !currentUser) {
                        forceLogout(store)
                        return next(action)
                    }

                    let currentTimeout = 0
                    reconnectInterval = setInterval(() => {
                        if (ws.getSocket?.readyState === WebSocket.OPEN) {
                            ws.send(WebSocketEvent.RE_LOGIN, {
                                code: reloginCode,
                                user: username
                            })
                            clearReconnectInterval()
                        }

                        if (currentTimeout >= RECONNECT_TIMEOUT || serverErrorState) {
                            clearReconnectInterval()
                            if (!serverErrorState) forceLogout(store)
                        }
                        currentTimeout += RECONNECT_INTERVAL
                    }, RECONNECT_INTERVAL)
                } catch (_) {
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
                        mes: message
                    });
                }
                break;
            }
            case getRoomChatHistory.type: {
                const { name, page } = action.payload;
                if (ws.getSocket?.readyState === WebSocket.OPEN) {
                    ws.send(WebSocketEvent.GET_ROOM_CHAT_MES, {
                        name: name,
                        page: page
                    });
                }
                break;
            }
        }

        return next(action)
    }
}
