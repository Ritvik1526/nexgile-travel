const { guests, reservations, loyaltyData } = require('../data/mockData');

exports.getAll = (req, res) => {
  const { search, tier, page = 1, limit = 20 } = req.query;
  let data = [...guests];
  if (search) {
    const q = search.toLowerCase();
    data = data.filter(g => `${g.firstName} ${g.lastName}`.toLowerCase().includes(q) || g.email.toLowerCase().includes(q));
  }
  if (tier) data = data.filter(g => g.loyaltyTier === tier);
  const start = (page - 1) * limit;
  res.json({ success: true, data: data.slice(start, start + Number(limit)), total: data.length });
};

exports.getById = (req, res) => {
  const guest = guests.find(g => g.id === req.params.id);
  if (!guest) return res.status(404).json({ success: false, message: 'Guest not found' });
  const guestReservations = reservations.filter(r => r.guestId === req.params.id);
  const tierInfo = loyaltyData.tiers.find(t => t.name === guest.loyaltyTier);
  res.json({ success: true, data: { ...guest, reservations: guestReservations, tierInfo } });
};

exports.getLoyaltyTiers = (req, res) => {
  res.json({ success: true, data: loyaltyData.tiers });
};
