import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SocketSlice {
    isConnected: boolean
    isReconnecting: boolean
    errorMessage: string | null
}

const initialState: SocketSlice = {
    isConnected: false,
    isReconnecting: false,
    errorMessage: null
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
        }
    }
})

export default socketSlice.reducer
export const { setConnected, setErrorMessage, setReconnecting } = socketSlice.actions