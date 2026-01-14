import type { User } from "@/constants/User";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
    user: User | null,
    isLoading: boolean,
}

const getCurrentUser = (): User | null => {
    try {
        const savedUser = localStorage.getItem("user")
        return savedUser ? JSON.parse(savedUser) : null
    }
    catch(_) {
        return null
    }
}
const initialState: UserSlice = {
    user: getCurrentUser(),
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