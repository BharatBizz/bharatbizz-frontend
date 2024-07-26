import { saveUser, removeUser} from "../reducers/adminSlice";
import axios from '../../config/axios'
import { notification } from 'antd';



export const asyncCurrentAdmin = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/admin/currentAdmin', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
        await dispatch(saveUser(response.data.admin));
    } catch (error) {
        console.error(error);
    }
};

export const asyncAdminRegister = (data) => async (dispatch, getState) => {
    try {
        // Log the data to the console
        console.log(data);
        
        // Send POST request to register admin
        const response = await axios.post('/admin/register', data);
        
        // Show success notification
        notification.success({
            message: 'Success',
            description: 'Admin registered successfully!',
            placement: 'topRight', 
            duration: 3 
        });

        // Dispatch the saveUser action with the received data
        await dispatch(saveUser(response.data));
    } catch (error) {
        // Show error notification
        notification.error({
            message: 'Error',
            description: 'There was an error during admin registration. Please try again later.',
            placement: 'topRight', 
            duration: 3
        });
    }
};

export const asyncAdminLogin = (data, navigate) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/admin/login', data);
        console.log(res.data);
        await dispatch(asyncCurrentAdmin(res.data.token));
        const expiresInMilliseconds = res.data.expiresIn;
        const expirationTime = Date.now() + expiresInMilliseconds;
        localStorage.setItem('token', res.data.token);
        await navigate('/dashboard')
    } catch (error) {
        if (error.response && error.response.status === 401) {
        } else {
            console.error(error);
        }
    }
};

export const asyncLogoutAdmin = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/admin/logout');
        await dispatch(removeUser());
        toast.success('Logged out.');
    } catch (error) {
        if (error.response && error.response.status === 401) {
            toast.error('Logout Error.');
        } else {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        }
    }
}

export const asyncUserRegister = (data) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/user/register', data);
        
        await dispatch(saveUser(res.data));
        
        notification.success({
            message: 'Registration Successful',
            description: 'You have been registered successfully. Please check your email to verify your account.',
            placement: 'topRight', // Optional, specify where you want the notification to appear
        });
    } catch (error) {
          notification.error({
            message: 'Registration Failed',
            description: error.response?.data?.message || 'An error occurred during registration. Please try again later.',
            placement: 'topRight', // Optional, specify where you want the notification to appear
        });
    }
};