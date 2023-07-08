import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
});

export const privateAxiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true,
  
});
