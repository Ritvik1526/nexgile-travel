import { api } from './api';
export const revenueService = {
  getDashboard: (propertyId) => api.get(`/revenue/dashboard${propertyId ? '?propertyId=' + propertyId : ''}`),
  getCurrent: () => api.get('/revenue/current'),
  getForecast: (days = 7) => api.get(`/revenue/forecast?days=${days}`),
  getMonthly: () => api.get('/revenue/monthly'),
  getPricing: () => api.get('/revenue/pricing')
};
