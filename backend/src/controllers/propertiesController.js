const { properties, roomTypes } = require('../data/mockData');

exports.getAll = (req, res) => {
  res.json({ success: true, data: properties, total: properties.length });
};

exports.getById = (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
  const rooms = roomTypes.filter(r => r.propertyId === req.params.id);
  res.json({ success: true, data: { ...property, roomTypes: rooms } });
};

exports.getMetrics = (req, res) => {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
  res.json({ success: true, data: property.metrics });
};

exports.getSummary = (req, res) => {
  const summary = {
    totalProperties: properties.length,
    totalRooms: properties.reduce((s, p) => s + p.totalRooms, 0),
    avgOccupancy: Math.round(properties.reduce((s, p) => s + p.metrics.occupancy, 0) / properties.length),
    avgRevPAR: Math.round(properties.reduce((s, p) => s + p.metrics.revpar, 0) / properties.length),
    avgSatisfaction: (properties.reduce((s, p) => s + p.metrics.satisfaction, 0) / properties.length).toFixed(1)
  };
  res.json({ success: true, data: summary });
};
