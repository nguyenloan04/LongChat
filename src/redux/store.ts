import { socketMiddleware } from "@/middlewares/webSocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import userPageReducer from "./slices/userPageSlice.ts"
import socketReducer from './slices/socketSlice'

export const store = configureStore({
    reducer: {
        authForm: authReducer,
        currentUser: userReducer,
        socketState: socketReducer,
        userPageState: userPageReducer,
    },
    middleware: (getDefault) => getDefault().concat(socketMiddleware)
})