import type { User } from "@/constants/User";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
    user: User | null
}

const initialState: UserSlice = {
    user: null
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<UserSlice>) {
            state.user = action.payload.user
        }
    }
})

export default userSlice.reducer
export const { setCurrentUser } = userSlice.actions