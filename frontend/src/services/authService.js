import { api } from './api';

export const authService = {
  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    if (data.token) localStorage.setItem('travai_token', data.token);
    return data;
  },
  logout: async () => {
    try { await api.post('/auth/logout'); } catch {}
    localStorage.removeItem('travai_token');
  },
  me: () => api.get('/auth/me'),
  isAuthenticated: () => !!localStorage.getItem('travai_token')
};
