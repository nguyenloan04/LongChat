//Data type of WEBSOCKET_ACTION is "onchat"
export const WEBSOCKET_ACTION = "onchat" as const

export enum WebSocketEvent {
    REGISTER = "REGISTER",
    LOGIN = "LOGIN",
    RE_LOGIN = "RE_LOGIN",
    LOGOUT = "LOGOUT",
    CREATE_ROOM = "CREATE_ROOM",
    JOIN_ROOM = "JOIN_ROOM",
    GET_ROOM_CHAT_MES = "GET_ROOM_CHAT_MES",
    GET_PEOPLE_CHAT_MES = "GET_PEOPLE_CHAT_MES",
    //Noted
    SEND_CHAT_TO_ROOM = "SEND_CHAT",
    SEND_CHAT_TO_PEOPLE = "SEND_CHAT",
    CHECK_USER = "CHECK_USER",
    GET_USER_LIST = "GET_USER_LIST"
}

export interface MessageData {
    event: string //Define later
    data: {
        //Auth
        user?: string,
        pass?: string,
        //Relogin
        code?: string
        //Room
        name?: string
        page: number
        //Message
        type?: string,
        to?: string
        mes: string
    }
}