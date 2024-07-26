import { notification } from "antd";
import axios from "../../config/axios";
import { saveHistory, saveInvestor } from "../reducers/userSlice";
const token=localStorage.getItem('token')||null
console.log(token)
export const asyncCurrentInvestor = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/user/currentInvestor', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        await dispatch(saveInvestor(response.data.user));
    } catch (error) {
        console.error(error);
    }
};


export const asyncInvestorRegister = (data) => async (dispatch, getState) => {
    try {
        console.log(data);
        const response = await axios.post('/user/register', data);

        if (response.data && response.data.message) {
            notification.success({
                message: 'Success',
                description: response.data.message,
                placement: 'topRight',
                duration: 3,
            });
        } else {
            notification.success({
                message: 'Success',
                description: 'Investor registered successfully',
                placement: 'topRight',
                duration: 3,
            });
        }

    
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error in investor registration';

        notification.error({
            message: errorMessage,
            placement: 'topRight',
            duration: 3,
        });

        console.log(error);
    }
};


export const asyncInvestorLogin = (data, navigate) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/user/login', data);
        console.log(res.data);
        await dispatch(asyncCurrentInvestor(res.data.token));
        const expiresInMilliseconds = res.data.expiresIn;
        const expirationTime = Date.now() + expiresInMilliseconds;
        localStorage.setItem('token', res.data.token);
        await navigate('/investor/dashboard')
    } catch (error) {
        if (error.response && error.response.status === 401) {
        } else {
            console.error(error);
        }
    }
};


export const asyncInvestorDeposit=(amount,userId)=>async(dispatch,getState)=>{
try {
    console.log(amount)
    const token = localStorage.getItem('token')
    console.log(token)
    const response=await axios.post(`/user/deposit/${userId}`  ,{amount},{
        headers: { Authorization: `Bearer ${token}` }
    })
} catch (error) {
    console.log(error)
}
}


export const asyncFetchHistory = (userId, page, limit) => async (dispatch) => {
    try {
        const response = await axios.get(`/user/getHistory/${userId}?page=${page}&limit=${limit}`,{
            headers: { Authorization: `Bearer ${token}` }

        });
        dispatch(saveHistory(response.data));
    } catch (error) {
        console.log(error);
    }
};