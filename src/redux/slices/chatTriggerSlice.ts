import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ChatTriggerSlice {
    openStickerPicker: boolean,
    openEmojiPicker: boolean,
    openCreateRoom: boolean
}

const initialState: ChatTriggerSlice = {
    openStickerPicker: false,
    openEmojiPicker: false,
    openCreateRoom: false
}

export const chatTriggerSlice = createSlice({
    name: "chatPickerSlice",
    initialState,
    reducers: {
        setOpenStickerPicker(state, action: PayloadAction<boolean>) {
            state.openEmojiPicker = false
            state.openStickerPicker = action.payload
        },
        setOpenEmojiPicker(state, action: PayloadAction<boolean>) {
            state.openStickerPicker = false
            state.openEmojiPicker = action.payload
        },
        setOpenCreateRoom(state, action: PayloadAction<boolean>) {
            state.openCreateRoom = action.payload
        }
    }
})

export default chatTriggerSlice.reducer
export const {setOpenStickerPicker, setOpenEmojiPicker, setOpenCreateRoom} = chatTriggerSlice.actions