import type { User } from "@/constants/User";
import { setConnected, setErrorMessage } from "@/redux/slices/socketSlice";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { WebsocketInstance } from "@/socket/WebsocketInstance";
import { WebSocketEvent } from "@/socket/types/WebSoketMessage";
import { forceLogout } from "@/utils/authUtil";
import type { Middleware } from "@reduxjs/toolkit";

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
                store.dispatch({ type: 'socket/requestRelogin' })
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
                    clearReconnectInterval()
                    serverErrorState = false

                    const reloginCode = localStorage.getItem("RE_LOGIN_CODE")
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
                                user: currentUser.username
                            })
                            clearReconnectInterval()
                        }

                        if (currentTimeout >= RECONNECT_TIMEOUT || serverErrorState) {
                            clearReconnectInterval()
                            if (!serverErrorState) forceLogout(store)
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