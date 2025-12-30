import type { User } from "@/constants/User";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
    user: User | null,
    isLoading: boolean,
}

const initialState: UserSlice = {
    user: null,
    isLoading: true,
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    }
})

export default userSlice.reducer
export const { setCurrentUser, setIsLoading } = userSlice.actions