import { setCurrentUser } from "@/redux/slices/userSlice"
import type { Dispatch, MiddlewareAPI, UnknownAction } from "@reduxjs/toolkit"

export function forceLogout(store: MiddlewareAPI<Dispatch<UnknownAction>, any>) {
    localStorage.removeItem("RE_LOGIN_CODE")
    localStorage.removeItem("user")
    store.dispatch(setCurrentUser(null))
}