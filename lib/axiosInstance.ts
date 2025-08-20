import { getSessionStorage } from '@/utils/storage';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9090';

const token = getSessionStorage('access_token');

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: token,
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
