import { WebsocketInstance } from "@/socket/WebsocketInstance";
import { WebSocketEvent } from "@/socket/types/WebSoketMessage";
import type { Middleware } from "@reduxjs/toolkit";

export const socketMiddleware: Middleware = (store) => {
    const ws = WebsocketInstance.getInstance()

    //Global state

    ws.subscribe(WebSocketEvent.GET_ROOM_CHAT_MES, (response) => {
        if (response.status === "success") {
            const data = response.data
            //Insert action into store.dispatch()
            // store.dispatch()
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_ROOM, (response) => {
        if (response.status === "success") {
            const data = response.data
            //Check does message come from owner here
            //Insert action into store.dispatch()
            // store.dispatch()
        }
    })

    ws.subscribe(WebSocketEvent.SEND_CHAT_TO_PEOPLE, (response) => {
        if (response.status === "success") {
            const data = response.data
            //Check does message come from owner here
            //Insert action into store.dispatch()
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

    return (next) => (action: any) => {
        switch(action.type) {
            //Example code
            case 'something/example': {
                const actionData = action.payload
                // ws.send()
                break
            }
        }

        return next(action)
    }
}