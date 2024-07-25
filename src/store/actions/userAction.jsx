import { notification } from "antd";
import axios from "../../config/axios";
import { saveInvestor } from "../reducers/userSlice";

export const asyncCurrentInvestor = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/user/currentInvestor', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        await dispatch(saveInvestor(response.data.admin));
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

export const asyncInvestorLogin = (data) => async (dispatch, getState) => {
    try {
        console.log(data);
        const response = await axios.post('/user/login', data);

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
                description: 'LoggedIn Successfully',
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