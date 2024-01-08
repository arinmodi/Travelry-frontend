import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:null,
    diary:null,
}

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setLogin : (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },

        setLogout : (state) => {
            state.user = null;
            state.token = null;
            state.diary=null
        },

        setUser : (state, action) => {
            state.user = action.payload.user
        },

        setDiary : (state, action) => {
            state.diary = action.payload.diary
        }
    }
});

export const { setLogin, setLogout, setUser, setDiary } = authSlice.actions;

export default authSlice.reducer;