import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    ReceiveMsgGetChatPeoplePayload,
    ReceiveMsgGetUserListPayload
} from "@/socket/types/WebsocketReceivePayload";
import type {
    SendMsgGetChatPayload,
    SendMsgGetUserListPayload,
    SendMsgSendChatPayload
} from "@/socket/types/WebsocketSendPayload";

interface ChatState {
    // Key: target user, Value: data received
    peopleHistory: Record<string, ReceiveMsgGetChatPeoplePayload[]>;
    // get list users that account had chatted
    userList: ReceiveMsgGetUserListPayload[];
    // currentUser that account open
    currentChatTarget: ReceiveMsgGetUserListPayload | null;
    isLoading: boolean; //check for loading data from server
}

const initialState: ChatState = {
    peopleHistory: {},
    userList: [],
    currentChatTarget: null,
    isLoading: false,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // request to get user list
        getUserList: (state, action: PayloadAction<SendMsgGetUserListPayload>) => {
            state.isLoading = true;
        },
        // request to get message from chat
        getPeopleChatHistory: (state, action: PayloadAction<SendMsgGetChatPayload>) => {
            state.isLoading = true;
        },

        // request to send message to user
        sendPeopleChat: (state, action: PayloadAction<SendMsgSendChatPayload>) => {

        },

        // update store
        //get user list account had chatted
        setUserList: (state, action: PayloadAction<ReceiveMsgGetUserListPayload[]>) => {
            state.userList = action.payload;
            const sortedList = [...action.payload].sort((a, b) => {
                return new Date(b.actionTime || 0).getTime() - new Date(a.actionTime || 0).getTime();
            });
            state.userList = sortedList;
            state.isLoading = false;
        },

        // Choose one to read chat history and chat
        setCurrentChatTarget: (state, action: PayloadAction<ReceiveMsgGetUserListPayload>) => {
            state.currentChatTarget = action.payload;
        },
        setPeopleChatHistory: (state, action: PayloadAction<{ targetName: string, messages: ReceiveMsgGetChatPeoplePayload[] }>) => {
            const { targetName, messages } = action.payload;
            // state.peopleHistory[targetName] = messages;
            state.peopleHistory[targetName] = [...messages].reverse();
            state.isLoading = false;
        },
        receiveNewPeopleMessage: (state, action: PayloadAction<{ targetName: string, message: ReceiveMsgGetChatPeoplePayload }>) => {
            const { targetName, message } = action.payload;

            if (!state.peopleHistory[targetName]) {
                state.peopleHistory[targetName] = [];
            }
            const isExist = state.peopleHistory[targetName].find(m => m.id === message.id);
            if (!isExist) {
                state.peopleHistory[targetName].push(message);
            }

            const userIndex = state.userList.findIndex(u => u.name.toLowerCase() === targetName.toLowerCase());

            if (userIndex !== -1) {
                const updatedUser = {
                    ...state.userList[userIndex],
                    actionTime: message.createAt
                };

                state.userList = [
                    updatedUser,
                    ...state.userList.filter((_, index) => index !== userIndex)
                ];
            } else {
                // if u chat to new user that u have never chatted to them before
                const newUser: ReceiveMsgGetUserListPayload = {
                    name: targetName,
                    type: 0,
                    actionTime: message.createAt
                };

                state.userList = [newUser, ...state.userList];
            }
            state.isLoading = false;
        },
    },
});

export const {
    getUserList,
    getPeopleChatHistory,
    sendPeopleChat,
    setUserList,
    setCurrentChatTarget,
    setPeopleChatHistory,
    receiveNewPeopleMessage
} = chatSlice.actions;

export default chatSlice.reducer;