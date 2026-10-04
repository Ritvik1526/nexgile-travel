import { api } from './api';
export const propertiesService = {
  getAll: () => api.get('/properties'),
  getSummary: () => api.get('/properties/summary'),
  getById: (id) => api.get(`/properties/${id}`),
  getMetrics: (id) => api.get(`/properties/${id}/metrics`)
};
