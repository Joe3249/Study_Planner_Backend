const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  importance: { type: String, enum: ['low', 'med', 'high'], default: 'low' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  day: {type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],default: null}
});

module.exports = mongoose.model('Todo', todoSchema);
