import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4006/api', // URL BACKEND
  withCredentials: true,
});

export default axiosInstance;
