import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface UserPageSlice {
    theme: string,
    changePasswordCheckbox: boolean,
    chooseViewMenuUser: boolean,
}

const initialState: UserPageSlice = {
    theme: localStorage.getItem("theme") || "light",
    changePasswordCheckbox: false,
    chooseViewMenuUser: false,
}

export const userPageSlice = createSlice({
    name: "userPage",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },
        setChangePasswordCheckbox: (state, action: PayloadAction<boolean>) => {
            state.changePasswordCheckbox = action.payload
        },
        setChooseViewMenuUser: (state, action: PayloadAction<boolean>) => {
            state.chooseViewMenuUser = action.payload
        }
    }
})

export default userPageSlice.reducer
export const {setTheme, setChangePasswordCheckbox, setChooseViewMenuUser} = userPageSlice.actions