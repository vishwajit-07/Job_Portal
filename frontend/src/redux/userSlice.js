import { createSlice } from "@reduxjs/toolkit";

// // Creating the user slice
// const userSlice = createSlice({
//     name: "user",
//     initialState:{
//         allUsers:[],
//         loading: false,
//         error: null,  // Initial error state is null
//         searchUserByText:'',

//     },
//     reducers: {
//         // Action to set all users in the state
//         setAllUsers: (state, action) => {
//             state.allUsers = action.payload;
//         },
//         // Action to handle loading state
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         // Action to handle errors
//         setError: (state, action) => {
//             state.error = action.payload;
//         },
//         setSearchUserByText: (state, action) => {
//             state.searchUserByText = action.payload;
//         },
//     },
// });

// // Exporting actions to be used in the hook or components
// export const { setAllUsers, setLoading, setError, setSearchUserByText } = userSlice.actions;

// // Exporting the reducer to add to the Redux store
// export default userSlice.reducer;

// userSlice.js
const initialState = {
    allUsers: [],
    allRecruiters: [],
    loading: false,
  };
  
  const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAllUsers: (state, action) => {
        state.allUsers = action.payload;
      },
      setAllRecruiters:(state, action) => {
        state.allRecruiters = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      }
    }
  });
  
  export const { setAllUsers, setLoading, setAllRecruiters } = userSlice.actions;
  export default userSlice.reducer;
  