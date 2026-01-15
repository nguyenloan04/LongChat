//Define type of data in message
export interface ReceiveMsgLoginPayload {
    RE_LOGIN_CODE: string
}

// export interface ReceiveMsgReLoginPayload { }

export interface ReceiveMsgReLoginPayload {
    RE_LOGIN_CODE: string
}

export interface ChatDataRoom { id: number, name: string, type: number, to: string, mes: string, createAt?: string }

export interface ReceiveMsgRoomManagementPayload {
    id: number,
    name: string,
    own: string,
    //TODO: Change this to a class
    userList: { id: number, name: string }[],
    //TODO: Change this to a class
    chatData: ChatDataRoom[]
}

export interface ReceiveMsgGetChatRoomPayload {
    id: number,
    name: string,
    own: string,
    //TODO: Change this to a class
    userList: { id: number, name: string }[],
    //TODO: Change this to a class
    chatData: ChatDataRoom[]
}

export interface ReceiveMsgGetChatPeoplePayload {
    id: number,
    name: string,
    type: number,
    to: string,
    mes: string,
    createAt: string
}

export interface ReceiveMsgSendChatPayload { }

export interface ReceiveMsgCheckUserPayload {
    status: boolean
}

export interface ReceiveMsgGetUserListPayload {
    name: string,
    type: number,
    actionTime: string
}