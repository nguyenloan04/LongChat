import type { ToastIconType } from "@/constants/ToastIcon";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ToastSlice {
    message: string;
    icon?: ToastIconType
}

interface SocketSlice {
    isConnected: boolean
    isReconnecting: boolean
    socketToast: ToastSlice & { id: number } | null
    errorMessage: string | null
}

const initialState: SocketSlice = {
    isConnected: false,
    isReconnecting: false,
    errorMessage: null,
    socketToast: null
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload
            if (action.payload) state.isReconnecting = false
        },

        setReconnecting: (state, action: PayloadAction<boolean>) => {
            state.isReconnecting = action.payload
        },

        setErrorMessage: (state, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload
        },

        setToastMessage: (state, action: PayloadAction<ToastSlice>) => {
            const { message, icon } = action.payload
            state.socketToast = { message, icon, id: Date.now() }
        },
        clearToastMessage: (state) => {
            state.socketToast = null;
        }
    }
})

export default socketSlice.reducer
export const { setConnected, setErrorMessage, setReconnecting, setToastMessage, clearToastMessage } = socketSlice.actions