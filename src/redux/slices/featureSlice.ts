import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FeatureSlice {
    activeIndex: number
    menuState: boolean
}

const initialState: FeatureSlice = {
    activeIndex: -1,
    menuState: true
}

export const featureSlice = createSlice({
    name: "feature",
    initialState,
    reducers: {
        setActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload
        },
        setMenuState: (state, action: PayloadAction<boolean>) => {
            state.menuState = action.payload
        }
    }
})

export default featureSlice.reducer
export const { setActiveIndex, setMenuState } = featureSlice.actions