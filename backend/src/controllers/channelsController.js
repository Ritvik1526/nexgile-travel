const { channels, marketplaceListings } = require('../data/mockData');

exports.getAll = (req, res) => {
  res.json({ success: true, data: channels, total: channels.length });
};

exports.sync = (req, res) => {
  const channel = channels.find(c => c.id === req.params.id);
  if (!channel) return res.status(404).json({ success: false, message: 'Channel not found' });
  channel.lastSync = new Date().toISOString();
  channel.errors = 0;
  res.json({ success: true, message: `Channel ${channel.name} synced successfully`, data: channel });
};

exports.getStats = (req, res) => {
  const stats = {
    totalChannels: channels.length,
    activeChannels: channels.filter(c => c.status === 'active').length,
    totalErrors: channels.reduce((s, c) => s + c.errors, 0),
    avgCommission: Math.round(channels.reduce((s, c) => s + c.commission, 0) / channels.length),
    topChannel: channels.sort((a, b) => b.contribution - a.contribution)[0]?.name
  };
  res.json({ success: true, data: stats });
};

exports.searchMarketplace = (req, res) => {
  const { type, location, q } = req.query;
  let data = [...marketplaceListings];
  if (type) data = data.filter(l => l.type === type);
  if (location) data = data.filter(l => l.location.toLowerCase().includes(location.toLowerCase()));
  if (q) data = data.filter(l => l.name.toLowerCase().includes(q.toLowerCase()));
  res.json({ success: true, data, total: data.length });
};
