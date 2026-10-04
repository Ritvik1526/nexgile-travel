const jwt = require('jsonwebtoken');
const { users } = require('../data/mockData');
const { JWT_SECRET } = require('../middleware/auth');

// Mock password map (in production: bcrypt hash in DB)
const passwords = {
  'admin@nexgile.com': 'admin123',
  'rohit.v@nexgile.com': 'prop123',
  'sunita.r@nexgile.com': 'front123',
  'karthik.n@nexgile.com': 'rev123',
  'meena.p@nexgile.com': 'hk123'
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password required' });

  const user = users.find(u => u.email === email);
  if (!user || passwords[email] !== password)
    return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  const { ...userInfo } = user;
  res.json({ success: true, token, user: userInfo });
};

exports.me = (req, res) => {
  res.json({ success: true, user: req.user });
};

exports.logout = (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};
