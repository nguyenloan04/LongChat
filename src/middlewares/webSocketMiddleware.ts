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
            console.log(`[WS] Sending RE_LOGIN for ${username}...`);
            ws.send(WebSocketEvent.RE_LOGIN, {
                code: reloginCode,
                user: username
            });

        } else {
            console.log("[WS] Guest mode connected.");
            store.dispatch(setConnected(true));
        }
    };

    ws.onConnectionLost = (code) => {
        console.log(`%c[WS] Connection Lost (Code: ${code})`, "color: red");

        store.dispatch(setConnected(false));

        if (code === 1006 || code === 1001) {
            console.log("[WS] Attempting to reconnect in 3s...");
            setTimeout(() => {
                ws.connect(); // Kết nối lại. Nếu thành công, onInitConnection sẽ chạy lại -> Auto Relogin
            }, 3000);
        }
    }

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
        // if (response.status === "success") {
        //     //Notice here
        // } else {
        //     //Re login failed, end session and require login
        //     localStorage.removeItem("RE_LOGIN_CODE")
        //     store.dispatch(setCurrentUser(null))
        // }
        if (response.status === "success") {
            console.log("%c[WS] Re-Login Success! System Ready.", "color: green");
            store.dispatch(setConnected(true));
        } else {
            console.error("[WS] Re-Login Failed. Logging out...");
            localStorage.removeItem("RE_LOGIN_CODE");
            localStorage.removeItem("username");
            localStorage.removeItem("theme");
            store.dispatch(setCurrentUser(null));
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
        console.log("[DEBUG] Received SEND_CHAT_TO_PEOPLE response:", response);
        if (response.status === "success") {
            const message = response.data as unknown as ReceiveMsgGetChatPeoplePayload;

            const state = store.getState();
            let username = state.currentUser.user?.username;

            if (!username) {
                username = localStorage.getItem("username") || undefined;
            }

            if (message && message.mes && username) {
                let targetName = message.name;
                if (message.name === username) {
                    targetName = message.to;
                }
                console.log("[WS] Gửi thành công. Đang tải lại lịch sử chat với:", targetName);
                store.dispatch(receiveNewPeopleMessage({targetName, message}));
                console.log("[WS-DEBUG] Đã Dispatch receiveNewPeopleMessage!");
                //
                // store.dispatch(getPeopleChatHistory({
                //     name: targetName,
                //     page: 1
                // }));
            }else {
                console.warn("something wrong");
            }
        }
    })
    ws.subscribe(WebSocketEvent.GET_PEOPLE_CHAT_MES, (response: WsReceiveMessage<WebSocketEvent.GET_PEOPLE_CHAT_MES>) => {
        console.log("[DEBUG] Received GET_PEOPLE_CHAT_MES response:", response);
        if (response.status === "success") {
            const messages = response.data;
            // const state = store.getState();
            const state = store.getState();
            console.log("[DEBUG] Current User State:", state.currentUser);
            let username = state.currentUser.user?.username;

            if (!username) {
                username = localStorage.getItem("username") || undefined;
            }

            console.log("[WS] History loaded. My User:", username, "Messages:", messages.length);

            if (messages && messages.length > 0 && username) {
                const firstMsg = messages[0];
                let targetName = "";

                if (firstMsg.name === username) {
                    targetName = firstMsg.to;
                } else {
                    targetName = firstMsg.name;
                }

                // Dispatch action lưu vào Redux Store
                store.dispatch(setPeopleChatHistory({ targetName, messages }));
            }
        }
    })
    ws.subscribe(WebSocketEvent.GET_USER_LIST, (response: WsReceiveMessage<WebSocketEvent.GET_USER_LIST>) => {
        console.log("[DEBUG] Received GET_USER_LIST response:", response);
        if (response.status === "success") {
            const userList = response.data;
            console.log("[DEBUG] Dispatching Set User List:", userList);
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
                    console.log("[WS] Relogin Action. User:", currentUser?.username, "Code:", reloginCode);
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
