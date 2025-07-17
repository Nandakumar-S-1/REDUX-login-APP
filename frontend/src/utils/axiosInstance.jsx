import axios from 'axios'
const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials:true,
    timeout:10000
})

export default axiosInstance