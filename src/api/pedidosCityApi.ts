import axios from 'axios';

const pedidosCityApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor middleware
pedidosCityApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { pedidosCityApi };