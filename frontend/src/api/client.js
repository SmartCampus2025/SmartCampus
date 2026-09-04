import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smartcampus_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Handle unauthorized redirect or token clearing
      const isAuthPath = window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/register');
      if (!isAuthPath) {
        localStorage.removeItem('smartcampus_token');
        localStorage.removeItem('smartcampus_user');
      }
    }
    return Promise.reject(error);
  }
);

export default client;
