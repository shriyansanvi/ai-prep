const mongoose = require('mongoose');
const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalTasksCompleted: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Progress', ProgressSchema);