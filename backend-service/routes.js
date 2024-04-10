// routes.js
const express = require('express');
const { User, Todo } = require('./model');
const router = express.Router();

// User registration
router.post('/users/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.json(user);
});

// User login
router.post('/users/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
        res.json(user);
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Get a user's todos
router.get('/users/:userId/todos', async (req, res) => {
    const todos = await Todo.findAll({ where: { UserId: req.params.userId } });
    res.json(todos);
});

// Create a new todo for a user
router.post('/users/:userId/todos', async (req, res) => {
    const todo = await Todo.create({ ...req.body, UserId: req.params.userId });
    res.json(todo);
});

// Update a user's todo
router.put('/users/:userId/todos/:id', async (req, res) => {
    const todo = await Todo.findOne({ where: { id: req.params.id, UserId: req.params.userId } });
    if (todo) {
        await todo.update(req.body);
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Delete a user's todo
router.delete('/users/:userId/todos/:id', async (req, res) => {
    const todo = await Todo.findOne({ where: { id: req.params.id, UserId: req.params.userId } });
    if (todo) {
        await todo.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

module.exports = router;