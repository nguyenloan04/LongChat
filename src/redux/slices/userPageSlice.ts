import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface UserPageSlice {
    theme: string,
    changePasswordCheckbox: boolean,
    chooseViewMenuUser: boolean,
    openChangeBanner: boolean,
    flagRefreshEditUserForm: number,
    chooseBannerType: string,
}

const initialState: UserPageSlice = {
    theme: localStorage.getItem("theme") || "light",
    changePasswordCheckbox: false,
    chooseViewMenuUser: false,
    openChangeBanner: false,
    flagRefreshEditUserForm: 0,
    chooseBannerType: "color",
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
        },
        setOpenChangeBanner: (state, action: PayloadAction<boolean>) => {
            state.openChangeBanner = action.payload
        },
        needRefreshEditUserForm: (state) => {
            state.flagRefreshEditUserForm++;
        },
        setChooseBannerType: (state, action: PayloadAction<string>) => {
            state.chooseBannerType = action.payload
        }
    }
})

export default userPageSlice.reducer
export const {
    setTheme, setChangePasswordCheckbox, setChooseViewMenuUser, setOpenChangeBanner,
    needRefreshEditUserForm, setChooseBannerType
} = userPageSlice.actions