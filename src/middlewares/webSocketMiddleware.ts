import { WebsocketInstance } from "@/socket/configWebsocket";
import { WebSocketEvent } from "@/socket/types/WebSoketMessage";
import type { Middleware } from "@reduxjs/toolkit";

export const socketMiddleware: Middleware = (store) => {
    const ws = WebsocketInstance.getInstance()

    ws.subscribe(WebSocketEvent.GET_ROOM_CHAT_MES, (response) => {
        if (response.status === "success") {
            const data = response.data
            //Check does message come from owner here
            // store.dispatch()
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_ROOM, (response) => {
        if (response.status === "success") {
            const data = response.data
            //Check does message come from owner here
            // store.dispatch()
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_PEOPLE, (response) => {
        if (response.status === "success") {
            const data = response.data
            //Check does message come from owner here
            // store.dispatch()
        }
    })

    
    ws.subscribe(WebSocketEvent.RE_LOGIN, (response) => {
        if (response.status === "success") {

        }
        else {
            localStorage.removeItem("RE_LOGIN_CODE")
        }
    })

    return (next) => (action) => {
        return next(action)
    }
}