import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL|| 'http://localhost:9090';

const token = "eyJraWQiOiJkODk1NGQzZS02MzQzLTQ2MWEtYTJmYS1lZTVmZTdmNGU1MzYiLCJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6Im1pY3Jvc2VydmljZS1jbGllbnQiLCJuYmYiOjE3NTQ0NzQyMTAsInByb2ZpbGVJZCI6IiIsInNjb3BlIjpbIm9wZW5pZCJdLCJyb2xlcyI6WyJBRE1JTl9ST0xFIl0sImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6OTA5MSIsImlkIjoiNTA3YzkzYjctMmRkNy00ZTJmLWE4NGEtZjA1YmU3ZDhiMjBkIiwidXNlclR5cGUiOiJTWVNURU1fVVNFUiIsImV4cCI6MTc1NDU2MDYxMCwiaWF0IjoxNzU0NDc0MjEwLCJqdGkiOiJkMGMyYzI0ZC0wYTIwLTRlNDgtYTQ5MC00NjBhMWNiMTkwMDEifQ.KYLcwxX3H2FRwVMRQUijFoCkznRqRBqzA4E0PNSiWtKd_CNsGzoNLQPYn0WA4q4zURBwjunhUfjcojOsnqQh-dx46XRuTPDAf9vks33aX-Gro9iGkfR3GxlN7qwyyJlAzE3uUTvnvnns129ojkpd1ATPHyBVhrYJy4UoMCH3Yeo_jXLvqqzNavytN3gBVFlbFXt96uzhrclgdvsnrCiKAnFvRs6T7nOTz8_Mx4xsoPiI6YOxUTTXfPeQwCvmhuSvax2IDbx1XGvXeJHXuqt_cIGcVKUjHIfDufldEY-uawLonHJrWbgu64oWOLjUw7VQjtbxz5KsBOsN8Wyt5bPNhMb3JeNlQ_-023m0r_ujl4kwpqSU_iE48CIZ_7GReDFclBgRZ-L9wUdFaSfdxQ9fw-PDvVaUHu6hnhjhaYyaYfmf4N83x1YLlgb6NO676cHrlpPAdHAoA0GD2TVgvA6IVU1rpKCxliIX4MRg5UCXl0xF4ltp1Q_LACVPb6f6O2Mb";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization:token
  },
});

axiosInstance.interceptors.request.use((config) => {
  // const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : 
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
