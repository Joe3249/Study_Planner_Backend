// server/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const authenticate = require('../middleware/authMiddleware');

// Get todos for the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new todo
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, dueDate, importance, completed } = req.body;
    const newTodo = new Todo({
    userId: req.user.userId,
    title,
    description,
    dueDate,
    importance,
    completed
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a todo
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        importance: req.body.importance,
        completed: req.body.completed
    },
    { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete a todo
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//IMPORTANT: Make sure this is at the bottom
module.exports = router;
