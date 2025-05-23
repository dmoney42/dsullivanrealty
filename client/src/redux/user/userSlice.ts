import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    currentUser: any; // You can replace `any` with your actual user type
    loading: boolean;
    error: string | null;
  }

  const initialState: UserState = {
    currentUser: null,
    loading: false,
    error: null,
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },

        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        signInFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },

        updateUserStart: (state) =>{
            state.loading = true;
        },

        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        updateUserFailure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },


        deleteUserStart: (state) => {
            state.loading = true;
        },

        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },

        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});


export const {signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure} = userSlice.actions;
export default userSlice.reducer;