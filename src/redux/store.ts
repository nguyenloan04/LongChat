import { socketMiddleware } from "@/middlewares/webSocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import userPageReducer from "./slices/userPageSlice.ts"
import socketReducer from './slices/socketSlice'
import editUserReducer from "./slices/editUserFormSlice.ts";

import chatReducer from "@/redux/slices/chatSlice.ts";

import chatTriggerSlice from "@/redux/slices/chatTriggerSlice.ts";


export const store = configureStore({
    reducer: {
        authForm: authReducer,
        currentUser: userReducer,
        socketState: socketReducer,
        userPageState: userPageReducer,
        editUserState: editUserReducer,
        chatState: chatReducer,
        chatTriggerSlice: chatTriggerSlice,

    },
    middleware: (getDefault) => getDefault().concat(socketMiddleware)
})