import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ChatPickerSlice {
    openStickerPicker: boolean,
    openEmojiPicker: boolean
}

const initialState: ChatPickerSlice = {
    openStickerPicker: false,
    openEmojiPicker: false
}

export const chatPickerSlice = createSlice({
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
        }
    }
})

export default chatPickerSlice.reducer
export const {setOpenStickerPicker, setOpenEmojiPicker} = chatPickerSlice.actions