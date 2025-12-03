import type { AuthFormSlice } from "../slices/authSlice";

export interface AuthFormPayload<K extends keyof AuthFormSlice> {
    key: K,
    value: AuthFormSlice[K]
}