import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:null
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
        }
    }
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;