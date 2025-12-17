//Define type of data.data in message
export interface SendMsgAuthenticationPayload {
    user: string,
    pass: string
}

export interface SendMsgReLoginPayload {
    user: string,
    code: string
}

export interface SendMsgLogOutPayload { }

export interface SendMsgRoomManagementPayload {
    name: string
}

export interface SendMsgGetChatPayload {
    name: string,
    page: number
}

export interface SendMsgSendChatPayload {
    type: 'people' | 'room',
    to: string,
    mes: string
}

export interface SendMsgCheckUserPayload {
    user: string
}

export interface SendMsgGetUserListPayload { }