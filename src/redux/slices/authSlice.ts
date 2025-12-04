import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthFormPayload } from "../payload/authPayload"
import { Gender } from "@/constants/Gender"

export interface AuthFormSlice {
    username: string | null,
    email: string | null,
    password: string | null,
    validatePassword: string | null,
    gender: Gender
}

const initialState: AuthFormSlice = {
    username: null,
    email: null,
    password: null,
    validatePassword: null,
    gender: Gender.NONE
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
        }
    }
})

export default authSlice.reducer
export const { setAuthFormValue } = authSlice.actions