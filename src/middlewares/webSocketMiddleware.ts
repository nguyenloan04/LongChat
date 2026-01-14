import type {User} from "@/constants/User";
import {setConnected, setErrorMessage} from "@/redux/slices/socketSlice";
import {setCurrentUser} from "@/redux/slices/userSlice";
import {WebsocketInstance} from "@/socket/WebsocketInstance";
import {WebSocketEvent} from "@/socket/types/WebSoketMessage";
import {forceLogout} from "@/utils/authUtil";
import type {Middleware} from "@reduxjs/toolkit";
import type {WsReceiveMessage} from "@/socket/types/WebSocketMessageReceive";
import type {ReceiveMsgGetChatPeoplePayload} from "@/socket/types/WebsocketReceivePayload";
import type {
    SendMsgGetChatPayload,
    SendMsgGetUserListPayload,
    SendMsgSendChatPayload
} from "@/socket/types/WebsocketSendPayload";

import {
    setUserList,
    setPeopleChatHistory,
    receiveNewPeopleMessage,
    getPeopleChatHistory,
    sendPeopleChat,
    getUserList
} from "@/redux/slices/chatPeopleSlice";

const RECONNECT_TIMEOUT = 180000 // Timeout 3 mins for reconnect
const RECONNECT_INTERVAL = 500 //Reconnect every 0.5s

export const socketMiddleware: Middleware = (store) => {
    const ws = WebsocketInstance.getInstance()
    let serverErrorState = false

    ws.onInitConnection = () => {
        // store.dispatch(setConnected(true))
        const reloginCode = localStorage.getItem("RE_LOGIN_CODE");
        const state = store.getState();
        let username = state.currentUser.user?.username;

        if (!username) {
            username = localStorage.getItem("username") || undefined;
        }

        if (reloginCode && username) {
            ws.send(WebSocketEvent.RE_LOGIN, {
                code: reloginCode,
                user: username
            });

        } else {
            store.dispatch(setConnected(true));
        }
    };

    ws.onConnectionLost = (code) => {
        switch (code) {
            //Connection closed from connection error or timeout
            case 1006: {
                ws.connect()
                store.dispatch({type: 'socket/requestRelogin'})
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
                const responseData = response.data as any;
                const newCode = responseData?.RE_LOGIN_CODE || responseData?.code;

                if (newCode) {
                    localStorage.setItem("RE_LOGIN_CODE", newCode);
                }
                store.dispatch(setConnected(true))
                store.dispatch(getUserList({}));
            } else {
                console.error("[WS] Re-Login Failed. Logging out...");
                localStorage.removeItem("RE_LOGIN_CODE");
                localStorage.removeItem("username");
                localStorage.removeItem("theme");
                store.dispatch(setCurrentUser(null));
            }
        }
    )

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
            const rawUsername = state.currentUser.user?.username || localStorage.getItem("username") || "";
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
                console.warn("[WS] Error");
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
                username = localStorage.getItem("username") || undefined;
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
                    serverErrorState = false

                    const reloginCode = localStorage.getItem("RE_LOGIN_CODE")
                    const state = store.getState()
                    // const currentUser: User = state.currentUser.currentUser as User
                    const currentUser: User = state.currentUser.user as User
                    const username = state.currentUser.user?.username;
                    if (!reloginCode || !currentUser) {
                        forceLogout(store)
                        break
                    }

                    let currentTimeout = 0
                    const reconnectInterval = setInterval(() => {
                        if (ws.getSocket?.readyState === WebSocket.OPEN) {
                            ws.send(WebSocketEvent.RE_LOGIN, {
                                code: reloginCode,
                                user: username
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
                } catch (_) {
                    forceLogout(store)
                }
                break
            }
        }

        return next(action)
    }
}
