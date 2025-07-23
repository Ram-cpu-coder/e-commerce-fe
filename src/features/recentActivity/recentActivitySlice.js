import { createSlice } from "@reduxjs/toolkit"
import reducer from "../reviews/reviewSlice"

const initialState = {
    recentActivity: []
}

const recentActivityslice = createSlice({
    name: "recentActivity",
    initialState,
    reducers: {
        setRecentActivity: (state, { payload }) => {
            state.recentActivity = payload
        }
    }
})

const { actions, reducer } = recentActivityslice
export const { setRecentActivity } = actions
export default reducer
