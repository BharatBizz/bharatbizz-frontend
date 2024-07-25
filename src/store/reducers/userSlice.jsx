import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuth: savedUser ? true : false,
    referralCode:null,// New state to manage the loading state for cash on delivery
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveInvestor: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
            state.isAuth = true;
        },
        saveTokenExpiration: (state, action) => {
            localStorage.setItem("tokenExpiration", action.payload);
            state.tokenExpiration = action.payload;
        },
        removeInvestor: (state) => {
            localStorage.removeItem("user");
            state.user = null;
            state.isAuth = false;
        },
      
    },
});

export const {
    saveInvestor,
    removeInvestor,
    saveReferralCode
} = userSlice.actions;

export default userSlice.reducer;