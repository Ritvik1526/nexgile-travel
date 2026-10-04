import { api } from './api';
export const reservationsService = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/reservations${qs ? '?' + qs : ''}`);
  },
  getById: (id) => api.get(`/reservations/${id}`),
  getStats: () => api.get('/reservations/stats'),
  create: (data) => api.post('/reservations', data),
  updateStatus: (id, status) => api.patch(`/reservations/${id}/status`, { status })
};
