import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null  // Ensure user is initialized
    },
    reducers: {
        // Action to set loading state
        setLoading(state, action) {
            state.loading = action.payload;
        },
        // Action to set authenticated user data
        setUser(state, action) {
            state.user = action.payload;
        }
    }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
