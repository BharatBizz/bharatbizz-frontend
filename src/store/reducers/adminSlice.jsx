import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
    dashboardinfo: null,
    totalPages: 0 

}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user= action.payload
        },
        saveDashBoardInfo: (state, action) => {
            console.log(action.payload)
            state.dashboardinfo = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        removeUser:(state,action)=>{
            localStorage.removeItem("user");
            state.user = null;
            state.isAuth = false;
        }
      
    },
});


export const { saveUser, saveDashBoardInfo, setLoading,removeUser} = adminSlice.actions;

export default adminSlice.reducer;