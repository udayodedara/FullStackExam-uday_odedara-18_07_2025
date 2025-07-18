import axios from 'axios';
console.log('process.env.NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // You can modify the request config here (e.g., add auth tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    console.log('error', error);
    // Handle response errors here (e.g., refresh token, redirect to login)
    if (error.response?.status === 401) {
      // Handle unauthorized access
      //   window.location.href = '/login';
      console.log('error', error);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
