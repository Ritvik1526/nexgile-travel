const { conciergeHistory, guests } = require('../data/mockData');

const aiResponses = [
  "I'd be happy to help with that! Let me look into the best options for you.",
  "Great choice! I've noted your preference and will make the arrangements right away.",
  "Based on your preferences and previous stays, I recommend our signature service package.",
  "I've forwarded your request to our team and you'll receive a confirmation shortly.",
  "The weather looks perfect for outdoor activities tomorrow. Shall I arrange a guided tour?"
];

exports.getHistory = (req, res) => {
  const { guestId } = req.query;
  let data = conciergeHistory;
  if (guestId) data = data.filter(c => c.guestId === guestId);
  res.json({ success: true, data });
};

exports.chat = (req, res) => {
  const { guestId, message } = req.body;
  if (!message) return res.status(400).json({ success: false, message: 'Message required' });
  const guest = guests.find(g => g.id === guestId);
  const greeting = guest ? `${guest.firstName}, ` : '';
  const aiReply = `${greeting}${aiResponses[Math.floor(Math.random() * aiResponses.length)]}`;
  res.json({
    success: true,
    data: {
      role: 'ai', text: aiReply, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['Book a restaurant', 'Request room service', 'Local recommendations', 'Arrange transport']
    }
  });
};

exports.getServiceRequests = (req, res) => {
  const requests = [
    { id: 'sr-001', guestId: 'g-001', room: '1204', type: 'room-service', description: 'Breakfast for 2', status: 'delivered', time: '08:30' },
    { id: 'sr-002', guestId: 'g-002', room: '2801', type: 'housekeeping', description: 'Extra towels', status: 'in-progress', time: '10:15' },
    { id: 'sr-003', guestId: 'g-003', room: '0812', type: 'transport', description: 'Airport drop 6pm', status: 'scheduled', time: '14:00' }
  ];
  res.json({ success: true, data: requests });
};
