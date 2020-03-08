const express = require('express');

const getTodo = require('./services/get-todo');
const getTodos = require('./services/get-todos');
const createTodo = require('./services/create-todo');
const updateTodo = require('./services/update-todo');
const deleteTodo = require('./services/delete-todo');

const router = express.Router();

router.get('/todos/:id', getTodo);
router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
