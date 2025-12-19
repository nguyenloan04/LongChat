import { socketMiddleware } from "@/middlewares/webSocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
    reducer: {
        authForm: authReducer,
        currentUser: userReducer
    },
    middleware: (getDefault) => getDefault().concat(socketMiddleware)
})