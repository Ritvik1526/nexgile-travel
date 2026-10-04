const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const authCtrl = require('../controllers/authController');
const propCtrl = require('../controllers/propertiesController');
const resCtrl = require('../controllers/reservationsController');
const revCtrl = require('../controllers/revenueController');
const guestCtrl = require('../controllers/guestsController');
const hkCtrl = require('../controllers/housekeepingController');
const concCtrl = require('../controllers/conciergeController');
const chCtrl = require('../controllers/channelsController');
const { maintenanceCases } = require('../data/mockData');

// Auth
router.post('/auth/login', authCtrl.login);
router.get('/auth/me', authMiddleware, authCtrl.me);
router.post('/auth/logout', authMiddleware, authCtrl.logout);

// Properties
router.get('/properties', authMiddleware, propCtrl.getAll);
router.get('/properties/summary', authMiddleware, propCtrl.getSummary);
router.get('/properties/:id', authMiddleware, propCtrl.getById);
router.get('/properties/:id/metrics', authMiddleware, propCtrl.getMetrics);

// Reservations
router.get('/reservations', authMiddleware, resCtrl.getAll);
router.get('/reservations/stats', authMiddleware, resCtrl.getStats);
router.get('/reservations/:id', authMiddleware, resCtrl.getById);
router.post('/reservations', authMiddleware, resCtrl.create);
router.patch('/reservations/:id/status', authMiddleware, resCtrl.updateStatus);

// Revenue
router.get('/revenue/dashboard', authMiddleware, revCtrl.getDashboard);
router.get('/revenue/current', authMiddleware, revCtrl.getCurrent);
router.get('/revenue/forecast', authMiddleware, revCtrl.getForecast);
router.get('/revenue/monthly', authMiddleware, revCtrl.getMonthly);
router.get('/revenue/pricing', authMiddleware, revCtrl.getPricing);

// Guests
router.get('/guests', authMiddleware, guestCtrl.getAll);
router.get('/guests/loyalty-tiers', authMiddleware, guestCtrl.getLoyaltyTiers);
router.get('/guests/:id', authMiddleware, guestCtrl.getById);

// Housekeeping
router.get('/housekeeping', authMiddleware, hkCtrl.getAll);
router.patch('/housekeeping/:id/status', authMiddleware, hkCtrl.updateStatus);

// Maintenance
router.get('/maintenance', authMiddleware, (req, res) => {
  const { status } = req.query;
  let data = maintenanceCases;
  if (status) data = data.filter(m => m.status === status);
  res.json({ success: true, data, total: data.length });
});

// AI Concierge
router.get('/concierge/history', authMiddleware, concCtrl.getHistory);
router.post('/concierge/chat', authMiddleware, concCtrl.chat);
router.get('/concierge/service-requests', authMiddleware, concCtrl.getServiceRequests);

// Channels & Distribution
router.get('/channels', authMiddleware, chCtrl.getAll);
router.get('/channels/stats', authMiddleware, chCtrl.getStats);
router.post('/channels/:id/sync', authMiddleware, chCtrl.sync);

// Marketplace
router.get('/marketplace/search', chCtrl.searchMarketplace);

// Analytics (aggregate)
router.get('/analytics/overview', authMiddleware, (req, res) => {
  const { properties } = require('../data/mockData');
  res.json({
    success: true,
    data: {
      kpis: [
        { label: 'Total Revenue (MTD)', value: '₹4.28Cr', change: +12.4, trend: 'up' },
        { label: 'Avg Occupancy', value: '87.3%', change: +3.2, trend: 'up' },
        { label: 'Average Daily Rate', value: '₹12,485', change: +8.7, trend: 'up' },
        { label: 'RevPAR', value: '₹10,899', change: +11.1, trend: 'up' },
        { label: 'Guest Satisfaction', value: '4.7/5', change: +0.2, trend: 'up' },
        { label: 'NPS Score', value: '72', change: +5, trend: 'up' }
      ],
      properties: properties.map(p => ({ id: p.id, name: p.name, ...p.metrics }))
    }
  });
});

module.exports = router;
