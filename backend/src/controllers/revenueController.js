const { revenueMetrics } = require('../data/mockData');

exports.getCurrent = (req, res) => {
  res.json({ success: true, data: revenueMetrics.current });
};

exports.getForecast = (req, res) => {
  const { days = 7 } = req.query;
  res.json({ success: true, data: revenueMetrics.forecast.slice(0, Number(days)) });
};

exports.getMonthly = (req, res) => {
  res.json({ success: true, data: revenueMetrics.monthly });
};

exports.getDashboard = (req, res) => {
  const { propertyId } = req.query;
  const current = revenueMetrics.current;
  // Simulated AI recommendation
  const aiInsights = [
    { type: 'opportunity', message: 'Dec 14–16 shows peak demand — consider increasing rates by 15–20%', impact: '+₹2.4L revenue', confidence: 89 },
    { type: 'alert', message: 'Competitor Grand Hyatt dropped rates by 8% on weekdays', impact: 'Monitor closely', confidence: 94 },
    { type: 'action', message: 'Expedia channel showing 2 errors — sync may be impacted', impact: 'Fix now', confidence: 100 }
  ];
  res.json({ success: true, data: { ...current, forecast: revenueMetrics.forecast.slice(0, 7), aiInsights } });
};

exports.getPricing = (req, res) => {
  const pricing = [
    { roomType: 'Deluxe Sea View', roomTypeId: 'rt-001', currentRate: 10500, suggestedRate: 12800, minRate: 7000, maxRate: 18000, channel: 'All', basis: 'AI: High demand detected', status: 'pending-approval' },
    { roomType: 'Premier Suite', roomTypeId: 'rt-002', currentRate: 24000, suggestedRate: 28500, minRate: 20000, maxRate: 45000, channel: 'All', basis: 'AI: Events this weekend', status: 'approved' },
    { roomType: 'Standard Room', roomTypeId: 'rt-003', currentRate: 7800, suggestedRate: 7800, minRate: 5500, maxRate: 12000, channel: 'All', basis: 'AI: Optimal', status: 'current' }
  ];
  res.json({ success: true, data: pricing });
};
