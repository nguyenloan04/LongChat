import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthFormPayload } from "../payload/authPayload"

export interface AuthFormSlice {
    username: string,
    password: string,
    validatePassword: string,
}

const initialState: AuthFormSlice = {
    username: "",
    password: "",
    validatePassword: "",
}

export const authSlice = createSlice({
    name: 'authForm',
    initialState,
    reducers: {
        setAuthFormValue(state, action: PayloadAction<AuthFormPayload<keyof AuthFormSlice>>) {
            const { key, value } = action.payload;
            (state[key] as any) = value;
        },

        resetAuthForm(state) {
            state.username = initialState.username;
            state.password = initialState.password;
            state.validatePassword = initialState.validatePassword;
        },
    }
})

export default authSlice.reducer
export const { setAuthFormValue, resetAuthForm } = authSlice.actions