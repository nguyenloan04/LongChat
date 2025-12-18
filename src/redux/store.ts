import { socketMiddleware } from "@/middlewares/websocketMiddleware";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        
    },
    middleware: (getDefault) => getDefault().concat(socketMiddleware)
})