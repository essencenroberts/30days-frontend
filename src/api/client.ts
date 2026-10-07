// talk to the backend API with backend address and add login token to every request

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// getErrorMessage
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Something went wrong. Please try again.'
  }

  return 'Something went wrong. Please try again.';
}

export default api;