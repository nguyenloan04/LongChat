import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {ReceiveMsgGetChatPeoplePayload} from "@/socket/types/WebsocketReceivePayload";
import type {SendMsgGetChatPayload, SendMsgSendChatPayload} from "@/socket/types/WebsocketSendPayload";

interface ChatState {
    // Key: target user, Value: data received
    peopleHistory: Record<string, ReceiveMsgGetChatPeoplePayload[]>;
    isLoading: boolean; //check for loading data from server
}

const initialState: ChatState = {
    peopleHistory: {},
    isLoading: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // request to get message from chat
        getPeopleChatHistory: (state, action: PayloadAction<SendMsgGetChatPayload>) => {
            state.isLoading = true;
        },

        // request to send message to user
        sendPeopleChat: (state, action: PayloadAction<SendMsgSendChatPayload>) => {

        },

        // update store
        setPeopleChatHistory: (state, action: PayloadAction<{ targetName: string, messages: ReceiveMsgGetChatPeoplePayload[] }>) => {
            const { targetName, messages } = action.payload;
            state.peopleHistory[targetName] = messages;
            state.isLoading = false;
        },

        receiveNewPeopleMessage: (state, action: PayloadAction<{ targetName: string, message: ReceiveMsgGetChatPeoplePayload }>) => {
            const { targetName, message } = action.payload;

            if (!state.peopleHistory[targetName]) {
                state.peopleHistory[targetName] = [];
            }

            // Check repeat old message
            const exists = state.peopleHistory[targetName].some(m => m.id === message.id);
            if (!exists) {
                state.peopleHistory[targetName].push(message);
            }
        },
    },
});

export const {
    getPeopleChatHistory,
    sendPeopleChat,
    setPeopleChatHistory,
    receiveNewPeopleMessage
} = chatSlice.actions;

export default chatSlice.reducer;