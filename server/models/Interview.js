const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    default: 'Easy' 
  },
  status: { 
    type: String, 
    enum: ['Solved', 'Attempted', 'Unsolved'], 
    default: 'Unsolved' 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Linked to logged-in user
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', InterviewSchema);