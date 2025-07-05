import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    featureBanner: [],
}

const featureBannerSlice = createSlice({
    name: "Feature Banner",
    initialState,
    reducers: {
        setFeatureBanner: (state, { payload }) => {
            state.featureBanner = payload || [];
        },
        resetFeatureBanner: (state) => {
            state.featureBanner = []
        }
    }
})

export const { setFeatureBanner, resetFeatureBanner } = featureBannerSlice.actions;

export default featureBannerSlice.reducer;