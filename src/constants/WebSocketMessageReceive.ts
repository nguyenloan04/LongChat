import type { ReceiveMsgCheckUserPayload, ReceiveMsgGetChatPayload, ReceiveMsgGetUserListPayload, ReceiveMsgLoginPayload, ReceiveMsgLogOutPayload, ReceiveMsgReLoginPayload, ReceiveMsgRoomManagementPayload } from "./WebsocketReceivePayload"
import type { WebSocketEvent } from "./WebSoketMessage"

interface ReceiveSuccessMessage<K extends WebSocketEvent, V> {
    event: K,
    status: "success",
    data: V
}

interface ReceiveErrorMessage<K extends WebSocketEvent> {
    event: K,
    status: "error",
    mes: string
}

export type WsEventResponse<K extends WebSocketEvent, V> =
    | ReceiveSuccessMessage<K, V>
    | ReceiveErrorMessage<K>

export interface WsReceiveMsgPayloadMap {
    [WebSocketEvent.REGISTER]: string,
    [WebSocketEvent.LOGIN]: ReceiveMsgLoginPayload,
    [WebSocketEvent.RE_LOGIN]: ReceiveMsgReLoginPayload,
    [WebSocketEvent.LOGOUT]: ReceiveMsgLogOutPayload,
    [WebSocketEvent.CREATE_ROOM]: ReceiveMsgRoomManagementPayload,
    [WebSocketEvent.JOIN_ROOM]: ReceiveMsgRoomManagementPayload,
    [WebSocketEvent.GET_ROOM_CHAT_MES]: ReceiveMsgGetChatPayload,
    [WebSocketEvent.GET_PEOPLE_CHAT_MES]: ReceiveMsgGetChatPayload,
    [WebSocketEvent.CHECK_USER]: ReceiveMsgCheckUserPayload,
    [WebSocketEvent.GET_USER_LIST]: ReceiveMsgGetUserListPayload
}

export type WsReceiveMessage<K extends keyof WsReceiveMsgPayloadMap> = WsEventResponse<K, WsReceiveMsgPayloadMap[K]>
