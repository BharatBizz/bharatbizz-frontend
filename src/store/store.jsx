import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import adminReducer from './reducers/adminSlice';
export const store = configureStore({
    reducer: {
        user: userReducer,
        admin:adminReducer,
    },
});