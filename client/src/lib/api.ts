import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? '';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    delete (config.headers as Record<string, unknown>)['Content-Type'];
  }
  config.headers['Cache-Control'] = 'no-cache';
  config.headers.Pragma = 'no-cache';
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as typeof error.config & { _retry?: boolean };
    if (error.response?.status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }
    if (String(original.url).includes('refresh-token')) {
      return Promise.reject(error);
    }
    const hadAuth = Boolean(original.headers?.Authorization);
    const refresh = localStorage.getItem('refreshToken');
    if (!hadAuth || !refresh) {
      return Promise.reject(error);
    }
    original._retry = true;
    try {
      const { data } = await axios.post(`${baseURL}/api/admin/refresh-token`, {
        refreshToken: refresh,
      });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return Promise.reject(error);
    }
  }
);
