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
    // Empty
}

export interface ReceiveMsgCheckUserPayload {
        status: boolean
}

export interface ReceiveMsgGetUserListPayload {
    //             "name": "Nhóm 77 Test API Frontend",
    //             "type": 1,
    //             "actionTime": "2025-12-17 09:17:07"
    name: string,
    type: number,
    actionTime: string
}