import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rating-backend-4341.onrender.com',
});

// Add token to headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
