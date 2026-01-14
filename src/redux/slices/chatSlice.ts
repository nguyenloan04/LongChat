import type { ChatDataRoom,
    ReceiveMsgGetChatRoomPayload,
} from "@/socket/types/WebsocketReceivePayload.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ChatSlice {
    roomHistory: Record<string, ReceiveMsgGetChatRoomPayload>
    isLoadingRoom: boolean
}

const initialState: ChatSlice = {
    roomHistory: {},
    isLoadingRoom: false
}

export const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        updateRoomHistory: (state, action: PayloadAction<{target: string, value: ReceiveMsgGetChatRoomPayload}>) => {
            const {target, value} = action.payload
            state.roomHistory[target] = value;
            state.isLoadingRoom = false;
        },

        receiveNewMessageFromRoom: (state, action: PayloadAction<{target: string, value: ChatDataRoom}>) => {
            const { target, value } = action.payload;

            if (!state.roomHistory[target]) {
                state.roomHistory[target] = {
                    id: 0,              
                    name: target,      
                    own: "",            
                    userList: [],       
                    chatData: []        
                };
            }

            const formattedMessage = {
                ...value,
                createAt: value.createAt || new Date().toISOString()
            };

            state.roomHistory[target].chatData.push(formattedMessage);
        },

        getRoomChatMessage: (state, action: PayloadAction<{roomName: string, page: number}>) => {
            state.isLoadingRoom = true
        },
        
        sendMessageToRoom: (state, action: PayloadAction<{roomName: string, message: any, username: string}>) => {
            const { roomName, message, username } = action.payload;

            const optimisticMessage = {
                id: Date.now(), //temp id
                name: username,  
                to: roomName,
                mes: message, 
                type: 1,
                createAt: new Date().toISOString()
            };

            if (state.roomHistory[roomName]) {
                state.roomHistory[roomName].chatData.push(optimisticMessage);
            }
        }
    }
})

export const {sendMessageToRoom, receiveNewMessageFromRoom,
    getRoomChatMessage, updateRoomHistory} = chatSlice.actions
export default chatSlice.reducer;