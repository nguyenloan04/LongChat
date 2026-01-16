import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    ReceiveMsgGetChatPeoplePayload, ReceiveMsgGetChatRoomPayload,
    ReceiveMsgGetUserListPayload, ReceiveMsgSendChatRoomPayload
} from "@/socket/types/WebsocketReceivePayload";
import type {
    SendMsgGetChatPayload,
    SendMsgGetUserListPayload,
    SendMsgSendChatPayload
} from "@/socket/types/WebsocketSendPayload";

interface ChatState {
    // Key: target user, Value: data received
    chatPeopleHistory: Record<string, ReceiveMsgGetChatPeoplePayload[]>;
    // Key: target room, Value: room info and chatData
    roomHistory: Record<string, ReceiveMsgGetChatRoomPayload>;
    // get list users that account had chatted
    userList: ReceiveMsgGetUserListPayload[];
    // currentUser that account open
    currentChatTarget: ReceiveMsgGetUserListPayload | null;
    isLoading: boolean; //check for loading data from server
    inputValue: string;
    currentPageRoom: Record<string, {page: number, continue: boolean}>;
}

const initialState: ChatState = {
    chatPeopleHistory: {},
    roomHistory: {},
    userList: [],
    currentChatTarget: null,
    isLoading: false,
    inputValue: "",
    currentPageRoom: {}
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // request to get user list
        getUserList: (state, _action: PayloadAction<SendMsgGetUserListPayload>) => {
            state.isLoading = true;
        },
        // request to get message from chat
        getPeopleChatHistory: (state, _action: PayloadAction<SendMsgGetChatPayload>) => {
            state.isLoading = true;
        },
        // request to get room info + message in room
        getRoomChatHistory: (state, _action: PayloadAction<SendMsgGetChatPayload>) => { state.isLoading = true; },
        // request to send message to user
        sendPeopleChat: (_state, _action: PayloadAction<SendMsgSendChatPayload>) => {

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
            state.chatPeopleHistory[targetName] = [...messages].reverse();
            state.isLoading = false;
        },
        updateRoomHistory: (state, action: PayloadAction<ReceiveMsgGetChatRoomPayload>) => {
            const payload = action.payload
            const target = payload.name
            state.roomHistory[target] = payload;
            state.roomHistory[target].chatData.reverse()
            state.isLoading = false;
            
            state.currentPageRoom[target] = {
                page: 1,
                continue: true,
            }
            
        },
        receiveNewPeopleMessage: (state, action: PayloadAction<{ targetName: string, message: ReceiveMsgGetChatPeoplePayload }>) => {
            const { targetName, message } = action.payload;

            if (!state.chatPeopleHistory[targetName]) {
                state.chatPeopleHistory[targetName] = [];
            }
            const isExist = state.chatPeopleHistory[targetName].find(m => {
                if (m.id !== 0 && message.id !== 0) {
                    return m.id === message.id;
                }

                return m.createAt === message.createAt && m.mes === message.mes;
            });

            if (!isExist) {
                state.chatPeopleHistory[targetName].push(message);
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
        addNewUserToSidebar: (state, action: PayloadAction<ReceiveMsgGetUserListPayload>) => {
            const newUser = action.payload;
            const exists = state.userList.find(u => u.name.toLowerCase() === newUser.name.toLowerCase());

            if (!exists) {
                state.userList = [newUser, ...state.userList];
            }
        },
        receiveNewMessageFromRoom: (state, action: PayloadAction<ReceiveMsgSendChatRoomPayload>) => {
            const payload = action.payload;
            const target = payload.to
            if(state.roomHistory[target]) {
                const formattedMessage = {
                    ...payload,
                    createAt: payload.createAt || new Date().toISOString()
                };

                state.roomHistory[target].chatData.push(formattedMessage);
            }
        },
        sendMessageToRoom: (_state, _action: PayloadAction<{roomName: string, message: any, username: string}>) => {
        },
        setInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload;
        },
        setEmojiInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue += action.payload;
        },
        receiveOldMessageRoom: (state, action: PayloadAction<ReceiveMsgGetChatRoomPayload>) => {
            const message = action.payload;
            if(message.chatData.length === 0) {
                state.currentPageRoom[message.name].continue = false
            } else {
                state.roomHistory[message.name].chatData = [
                    ...message.chatData.reverse(),
                    ...state.roomHistory[message.name].chatData
                ]
                state.currentPageRoom[message.name].page += 1;
            }
        }
    },
});

export const {
    getUserList,
    getPeopleChatHistory,
    getRoomChatHistory,
    sendPeopleChat,
    setUserList,
    setCurrentChatTarget,
    setPeopleChatHistory,
    updateRoomHistory,
    receiveNewPeopleMessage,
    receiveNewMessageFromRoom,
    sendMessageToRoom,
    addNewUserToSidebar,
    setInputValue,
    setEmojiInputValue,
    receiveOldMessageRoom
} = chatSlice.actions;

export default chatSlice.reducer;