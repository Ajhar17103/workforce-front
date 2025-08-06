import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL|| 'http://localhost:9090';

const token = "eyJraWQiOiJkODk1NGQzZS02MzQzLTQ2MWEtYTJmYS1lZTVmZTdmNGU1MzYiLCJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6Im1pY3Jvc2VydmljZS1jbGllbnQiLCJuYmYiOjE3NTQ0Nzk3OTksInByb2ZpbGVJZCI6IiIsInNjb3BlIjpbIm9wZW5pZCJdLCJyb2xlcyI6WyJBRE1JTl9ST0xFIl0sImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6OTA5MSIsImlkIjoiNTA3YzkzYjctMmRkNy00ZTJmLWE4NGEtZjA1YmU3ZDhiMjBkIiwidXNlclR5cGUiOiJTWVNURU1fVVNFUiIsImV4cCI6MTc1NDU2NjE5OSwiaWF0IjoxNzU0NDc5Nzk5LCJqdGkiOiI2MmU0ZDhiNS1iYjgyLTQ0ZTUtOGQzNC0zYjQ2YTllOGQ4MTYifQ.ki448rFJSOheXSWDqpmmEa65vdDf4UJCiUUMmeejeaPhE8hq7zARfA3UTFnHgC8mB38MrPb-0c5mqZqLzKUCRuQONegEk6tCzIGCtQyKgxC9UJ9nGB866bRKR9c2Ex17JnQ8C1qAftssR8BemuOXWrlpAjEdb_HERPz72O4gpryAB4SpkoCh0AgV36WQCpmjyUD_Xhi3uXeH-E_BcRCqrFLqHD-RPFpr-6cRGwWsP216EdB9hEaUWmIid9G_JIb7ynaxGxRxeY69j2F2S1jPcsJ11PeLnK7GD-yR188xiB3KNvy9QGjVxitFftPAPzfjk8jexoyHS52-UPjZkwxJBRGLydzfadCv-FqPQmMzgU2FtI3RK_2o2TM8NGZMpmefsdtDi95gz5NvlMVQTuGKMRV-ohVW4iZX_P05IRcioQ9FI7HES1dz4cHGXwzf0_84jkJV2r31oBdGvH-kyxwckxYXg1kp_VJntzk-3X_t1OU45I_qH3XEwqcWCaXQzwW3";

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
