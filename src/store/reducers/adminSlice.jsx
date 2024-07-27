import { createSlice } from "@reduxjs/toolkit";
const savedUser = localStorage.getItem("user");

const initialState = {
    loading: false,
    error: null,
    isAuthe: savedUser ? true : false,
    admin: savedUser ? JSON.parse(savedUser) : null,
    dashboardinfo: null,
    totalPages: 0,
    transactions:[] ,
    withdrawalRequests:[]

}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.admin= action.payload
            state.isAuthe=true
        },
        saveDashBoardInfo: (state, action) => {
            state.dashboardinfo = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        removeUser:(state,action)=>{
            localStorage.removeItem("user");
            state.admin = null;
            state.isAuthe = false;
        },
        saveAllTransactions:(state,action)=>{
            state.transactions=action.payload.history
            state.pagination=action.payload.pagination
        },
        saveWithdrawalRequests:(state,action)=>{
            state.withdrawalRequests=action.payload
        }
      
    },
});


export const { saveWithdrawalRequests,saveUser, saveDashBoardInfo,saveAllTransactions, setLoading,removeUser} = adminSlice.actions;

export default adminSlice.reducer;