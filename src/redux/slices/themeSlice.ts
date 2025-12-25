import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ThemeSlice {
    theme: string,
}

const initialState: ThemeSlice = {
    theme: localStorage.getItem("theme") || "light"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeSlice>) => {
            state.theme = action.payload.theme
        }
    }
})

export default themeSlice.reducer
export const {setTheme} = themeSlice.actions