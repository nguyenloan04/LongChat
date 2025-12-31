import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface EditUserFormSlice {
    avatar: string,
    displayName: string,
    banner: {
        type: string,
        content: string,
    },
    description: string,
}

const initialState: EditUserFormSlice = {
    avatar: "",
    displayName: "",
    banner: {
        type: "",
        content: "",
    },
    description: "",
}

export const editUserFormSlice = createSlice({
    name: "editUserForm",
    initialState,
    reducers: {
        setEditUserForm(state, action: PayloadAction<EditUserFormSlice>) {
            state.avatar = action.payload.avatar
            state.displayName = action.payload.displayName
            state.banner.type = action.payload.banner.type
            state.banner.content = action.payload.banner.content
            state.description = action.payload.description
        },
        setDisplayNameEditUserForm(state, action: PayloadAction<string>) {
            state.displayName = action.payload
        },
        setAvatarEditUserForm(state, action: PayloadAction<string>) {
            state.avatar = action.payload
        },
        setDescriptionEditUserForm(state, action: PayloadAction<string>) {
            state.description = action.payload
        },
        setBannerEditUserForm(state, action: PayloadAction<{ type: string, content: string }>) {
            state.banner.type = action.payload.type
            state.banner.content = action.payload.content
        }
    }
})

export default editUserFormSlice.reducer
export const {
    setEditUserForm,
    setDisplayNameEditUserForm,
    setAvatarEditUserForm,
    setDescriptionEditUserForm,
    setBannerEditUserForm, 
} = editUserFormSlice.actions