const { housekeepingTasks } = require('../data/mockData');

exports.getAll = (req, res) => {
  const { propertyId, status } = req.query;
  let data = [...housekeepingTasks];
  if (propertyId) data = data.filter(t => t.propertyId === propertyId);
  if (status) data = data.filter(t => t.status === status);
  const summary = {
    total: data.length,
    pending: data.filter(t => t.status === 'pending').length,
    inProgress: data.filter(t => t.status === 'in-progress').length,
    completed: data.filter(t => t.status === 'completed').length
  };
  res.json({ success: true, data, summary });
};

exports.updateStatus = (req, res) => {
  const idx = housekeepingTasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Task not found' });
  housekeepingTasks[idx] = { ...housekeepingTasks[idx], status: req.body.status, updatedAt: new Date().toISOString() };
  if (req.body.status === 'completed') housekeepingTasks[idx].completedAt = new Date().toISOString();
  res.json({ success: true, data: housekeepingTasks[idx] });
};
