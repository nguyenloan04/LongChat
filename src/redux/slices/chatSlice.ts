import type {
    ReceiveMsgGetChatPeoplePayload,
    ReceiveMsgGetChatRoomPayload, ReceiveMsgGetUserListPayload
} from "@/socket/types/WebsocketReceivePayload.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ChatSlice {
    userList: ReceiveMsgGetUserListPayload[] | null
    currentChat: ReceiveMsgGetChatRoomPayload | ReceiveMsgGetChatPeoplePayload[] | null
    typingContent: Record<string, string>
}

const initialState: ChatSlice = {
    userList: null,
    currentChat: null,
    typingContent: {}
}

export const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        setRoomChat: (state, action: PayloadAction<ReceiveMsgGetChatRoomPayload>) => {
            state.currentChat = action.payload
        },
        updateTypingContent: (state, action: PayloadAction<{id: string, text: string}>) => {
            const { id, text } = action.payload
            if(!state.typingContent[id]) {
                state.typingContent[id] = text
            } else {
                state.typingContent[id] += text
            }
        },
        clearTypingContent: (state, action: PayloadAction<string>) => {
            delete state.typingContent[action.payload] 
        }
    }
})

export const {setRoomChat, updateTypingContent} = chatSlice.actions
export default chatSlice.reducer;