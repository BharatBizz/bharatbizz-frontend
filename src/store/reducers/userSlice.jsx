import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    history: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },
    isAuth: savedUser ? true : false,
    referralCode: null, // New state to manage the referral code
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
        saveHistory: (state, action) => {
            state.history = action.payload.history;
            state.pagination = action.payload.pagination;    
        },
        saveReferralCode: (state, action) => {
            state.referralCode = action.payload;
        }
    }
});

export const {
    saveInvestor,
    removeInvestor,
    saveReferralCode,
    saveHistory
} = userSlice.actions;

export default userSlice.reducer;
