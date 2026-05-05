import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

export default API;
// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle common errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login'; // if you have auth
    }
    
    return Promise.reject(error);
  }
);



