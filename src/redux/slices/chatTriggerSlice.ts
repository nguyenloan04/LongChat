import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ChatTriggerSlice {
    openStickerPicker: boolean,
    openEmojiPicker: boolean,
    openCreateRoom: boolean,
    openJoinRoom: boolean,
}

const initialState: ChatTriggerSlice = {
    openStickerPicker: false,
    openEmojiPicker: false,
    openCreateRoom: false,
    openJoinRoom: false,
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
        },
        setOpenJoinRoom(state, action: PayloadAction<boolean>) {
            state.openJoinRoom = action.payload
        }
    }
})

export default chatTriggerSlice.reducer
export const {setOpenStickerPicker, setOpenEmojiPicker, setOpenCreateRoom, setOpenJoinRoom} = chatTriggerSlice.actions