import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthFormPayload } from "../payload/authPayload"
import { Gender } from "@/constants/Gender"
import { FormType } from "@/constants/AuthForm"

export interface AuthFormSlice {
    username: string,
    email: string,
    password: string,
    validatePassword: string,
    gender: Gender,
    currentForm: FormType
}

const initialState: AuthFormSlice = {
    username: "",
    email: "",
    password: "",
    validatePassword: "",
    gender: Gender.NONE,
    currentForm: FormType.LOGIN
}

//Create union type from AuthFormSlice
type AuthPayload = { [K in keyof AuthFormSlice]: AuthFormPayload<K> }[keyof AuthFormSlice]

export const authSlice = createSlice({
    name: 'authForm',
    initialState,
    reducers: {
        setAuthFormValue(state, action: PayloadAction<AuthPayload>) {
            const { key, value } = action.payload
            if (state[key]) (state[key] as any) = value
        },

        resetAuthForm(state) {
            state.username = initialState.username;
            state.email = initialState.email;
            state.password = initialState.password;
            state.validatePassword = initialState.validatePassword;
            state.gender = initialState.gender;
        }
    }
})

export default authSlice.reducer
export const { setAuthFormValue, resetAuthForm } = authSlice.actions