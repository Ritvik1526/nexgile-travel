import { api } from './api';
export const guestsService = {
  getAll: (params = {}) => { const qs = new URLSearchParams(params).toString(); return api.get(`/guests${qs ? '?' + qs : ''}`); },
  getById: (id) => api.get(`/guests/${id}`),
  getLoyaltyTiers: () => api.get('/guests/loyalty-tiers')
};
