const { v4: uuidv4 } = require('uuid');
const { reservations, guests, roomTypes } = require('../data/mockData');

exports.getAll = (req, res) => {
  const { propertyId, status, page = 1, limit = 20 } = req.query;
  let data = [...reservations];
  if (propertyId) data = data.filter(r => r.propertyId === propertyId);
  if (status) data = data.filter(r => r.status === status);

  // Enrich with guest name
  const enriched = data.map(r => {
    const guest = guests.find(g => g.id === r.guestId);
    return { ...r, guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown', guestTier: guest?.loyaltyTier };
  });

  const start = (page - 1) * limit;
  res.json({ success: true, data: enriched.slice(start, start + Number(limit)), total: enriched.length, page: Number(page) });
};

exports.getById = (req, res) => {
  const res_ = reservations.find(r => r.id === req.params.id);
  if (!res_) return res.status(404).json({ success: false, message: 'Reservation not found' });
  const guest = guests.find(g => g.id === res_.guestId);
  const roomType = roomTypes.find(rt => rt.id === res_.roomTypeId);
  res.json({ success: true, data: { ...res_, guest, roomType } });
};

exports.create = (req, res) => {
  const required = ['propertyId', 'roomTypeId', 'guestId', 'checkIn', 'checkOut'];
  for (const field of required) {
    if (!req.body[field]) return res.status(400).json({ success: false, message: `${field} is required` });
  }
  const nights = Math.ceil((new Date(req.body.checkOut) - new Date(req.body.checkIn)) / 86400000);
  const roomType = roomTypes.find(rt => rt.id === req.body.roomTypeId);
  const totalAmount = (roomType?.baseRate || 5000) * nights;
  const newRes = {
    id: `RES-2024-${String(reservations.length + 900).padStart(4, '0')}`,
    ...req.body, nights, totalAmount, paid: 0, balance: totalAmount,
    status: 'confirmed', createdAt: new Date().toISOString().split('T')[0],
    confirmationNo: `NXG${Math.floor(Math.random() * 900000) + 100000}`
  };
  reservations.push(newRes);
  res.status(201).json({ success: true, data: newRes, message: 'Reservation created successfully' });
};

exports.updateStatus = (req, res) => {
  const idx = reservations.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Reservation not found' });
  const validStatuses = ['confirmed', 'checked-in', 'checked-out', 'cancelled', 'no-show'];
  if (!validStatuses.includes(req.body.status))
    return res.status(400).json({ success: false, message: 'Invalid status' });
  reservations[idx] = { ...reservations[idx], status: req.body.status, updatedAt: new Date().toISOString() };
  res.json({ success: true, data: reservations[idx] });
};

exports.getStats = (req, res) => {
  const stats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    checkedIn: reservations.filter(r => r.status === 'checked-in').length,
    checkedOut: reservations.filter(r => r.status === 'checked-out').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
    todayArrivals: reservations.filter(r => r.checkIn === new Date().toISOString().split('T')[0]).length,
    todayDepartures: reservations.filter(r => r.checkOut === new Date().toISOString().split('T')[0]).length,
    totalRevenue: reservations.reduce((s, r) => s + r.totalAmount, 0)
  };
  res.json({ success: true, data: stats });
};
