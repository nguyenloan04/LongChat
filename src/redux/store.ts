import { socketMiddleware } from "@/middlewares/webSocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        
    },
    middleware: (getDefault) => getDefault().concat(socketMiddleware)
})