import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://ecommerceapis.vercel.app/",
});

export default axiosInstance;