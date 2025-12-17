//Define type of data in message
export interface ReceiveMsgLoginPayload {
    RE_LOGIN_CODE: string
}

export interface ReceiveMsgReLoginPayload { }


// FIXME: Complete this
export interface ReceiveMsgRoomManagementPayload {
    id: number,
    name: string,
    own: string,
    userList: {id: number, name: string}[],
    chatData: {id: number, name: string, type: number, to: string, mes: string, createAt: string}[]
}

export interface ReceiveMsgGetChatRoomPayload {
    id: number,
    name: string,
    own: string,
    userList: {id: number, name: string}[],
    chatData: {id: number, name: string, type: number, to: string, mes: string, createAt: string}[]
}

export interface ReceiveMsgGetChatPeoplePayload {
    id: number,
    name: string,
    type: number,
    to: string,
    mes: string,
    createAt: string
}

export interface ReceiveMsgSendChatPayload {
}

export interface ReceiveMsgCheckUserPayload {
}

export interface ReceiveMsgGetUserListPayload { }