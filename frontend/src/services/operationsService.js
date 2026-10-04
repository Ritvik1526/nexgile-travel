import { api } from './api';
export const housekeepingService = {
  getAll: (params = {}) => { const qs = new URLSearchParams(params).toString(); return api.get(`/housekeeping${qs ? '?' + qs : ''}`); },
  updateStatus: (id, status) => api.patch(`/housekeeping/${id}/status`, { status })
};
export const maintenanceService = {
  getAll: (params = {}) => { const qs = new URLSearchParams(params).toString(); return api.get(`/maintenance${qs ? '?' + qs : ''}`); }
};
export const conciergeService = {
  getHistory: (guestId) => api.get(`/concierge/history${guestId ? '?guestId=' + guestId : ''}`),
  chat: (guestId, message) => api.post('/concierge/chat', { guestId, message }),
  getServiceRequests: () => api.get('/concierge/service-requests')
};
export const channelsService = {
  getAll: () => api.get('/channels'),
  getStats: () => api.get('/channels/stats'),
  sync: (id) => api.post(`/channels/${id}/sync`)
};
export const marketplaceService = {
  search: (params = {}) => { const qs = new URLSearchParams(params).toString(); return api.get(`/marketplace/search${qs ? '?' + qs : ''}`); }
};
export const analyticsService = {
  getOverview: () => api.get('/analytics/overview')
};
