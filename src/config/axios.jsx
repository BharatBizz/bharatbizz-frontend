import axios from "axios";
const instance = axios.create(

    {
        baseURL: 'https://bharatbizz-backend.vercel.app/',
        withCredentials: true,

    });

export default instance;