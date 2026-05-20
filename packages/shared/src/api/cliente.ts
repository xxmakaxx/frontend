import axios from 'axios';

export const clienteHttp = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

clienteHttp.interceptors.request.use((config) => {
  const raw = localStorage.getItem('alamesa-autenticacion');
  if (raw) {
    try {
      const { state } = JSON.parse(raw);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    } catch {
      // token invalido en storage, ignorar
    }
  }
  return config;
});
