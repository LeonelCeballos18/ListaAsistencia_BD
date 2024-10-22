import axiosInstance from '../axios.instance.js';

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/check-auth');
    return response.data.success ? response.data.user : null;
  } catch (error) {
    console.log('Error checking auth:', error);
    return null;
  }
};
