import { notification } from "antd";
import axios from "../../config/axios";
import { removeInvestor, saveActivePackages, saveHistory, saveInvestor, saveYourTeam } from "../reducers/userSlice";
const token=localStorage.getItem('token')||null
console.log(token)
export const asyncCurrentInvestor = (token) => async (dispatch, getState) => {
    try {
        console.log(token)
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
        const openNotification = (type, message) => {
            notification[type]({
              message,
              placement: 'topRight',
              duration: 3,
            });
          };
        const res = await axios.post('/user/login', data);
        console.log(res.data);
        await dispatch(asyncCurrentInvestor(res.data.token));
        const expiresInMilliseconds = res.data.expiresIn;
        const expirationTime = Date.now() + expiresInMilliseconds;
        localStorage.setItem('token', res.data.token);
        openNotification('success', 'Login successful!');

        await navigate('/investor/dashboard')
    } catch (error) {
        if (error.response && error.response.status === 401) {
        } else {
            console.error(error);
            openNotification('error', 'Login failed! Please try again.');

        }
    }
};

export const asyncLogout=(navigate)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get('/user/logout')
       await dispatch(removeInvestor())
        navigate('/')
    } catch (error) {
        console.log(error)

    }
}

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

        const token=localStorage.getItem('token')
        const response = await axios.get(`/user/getHistory/${userId}?page=${page}&limit=${limit}`,{
            headers: { Authorization: `Bearer ${token}` }

        });
        await dispatch(saveHistory(response.data));
    } catch (error) {
        console.log(error);
    }
};


export const asyncRequestWithdrawalAmount = (userId, amount) => async (dispatch) => {
    try {
        // Ensure the endpoint and request payload are correct
        const response = await axios.post('/user/requestWithdraw', {
            userId,
            amount
        },
    {
        headers:{Authorization:`Bearer ${token}`}
    });
        return response.data; // Return data if needed
    } catch (error) {
        console.error('Error in API request:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

export const asyncGetReferredUsers=(userId)=>async(dispatch,getState)=>{
    try {
        const response=await axios.get(`/user/getYourTeam/${userId}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        await dispatch(saveYourTeam(response.data.team))
    } catch (error) {
        console.log(error)        
    }
}

export const asyncSaveSelectedPackage=(userId,amount,referredByUserID)=>async(dispatch,getState)=>{
    try {
        const token=localStorage.getItem('token')
        console.log(token)
        const response=await axios.post('/user/saveSelectedPackage',{userId,amount,referredByUserID},{
            headers:{Authorization:`Bearer ${token}`}
        })
        await dispatch(asyncCurrentInvestor(token))
    } catch (error) {
        console.log(error)
    }
}

export const asyncFetchActivePackages=(userId)=>async(dispatch,getState)=>{
    try {
        const token=localStorage.getItem('token')
        const response=await axios.get(`/user/getActivePackages/${userId}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        await dispatch(saveActivePackages(response.data.data))
    } catch (error) {
        console.log(error)
    }
}




export const asyncSendForgetLink = (email) => async (dispatch, getState) => {
    try {
      const response = await axios.post('/user/send-mail', email );
  
      notification.success({
        message: 'Success',
        description: 'Password reset link has been sent to your email.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };


export const asyncResetPassword = (id, password) => async (dispatch, getState) => {
    try {
      const response = await axios.post(`/user/forget-link/${id}`, { password });
  
      notification.success({
        message: 'Success',
        description: 'Password reset successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error resetting password.',
      });
    }
};

export const asyncUpdateProfile=(userId,userData)=>async(dispatch,getState)=>{
    try {
        const token=localStorage.getItem('token')
        console.log(token)
        const response = await axios.put(`/user/updateProfile/${userId}`, userData,{
            headers:{Authorization:`Bearer ${token}`}
        });
       await dispatch(asyncCurrentInvestor(token));
        notification.success({
          message: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
          placement: 'topRight',
        });
      } catch (error) {
        notification.error({
          message: 'Update Failed',
          description: 'There was an error updating your profile. Please try again.',
          placement: 'topRight',
        });
      }
}