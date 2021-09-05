const express = require('express')
const {
  getMyTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require('../Controllers/todo.controller')
const {
  validateGetTodos,
  validateAddTodo,
  validateUpdateTodo,
  validateDeleteTodo,
} = require('../Validation/todoValidation')
const router = express.Router()

router.post('/todos', validateGetTodos, getMyTodos)

router.post('/addnewtask', validateAddTodo, addTodo)

router.post('/deletetask', validateDeleteTodo, deleteTodo)

router.post('/updatetask', validateUpdateTodo, updateTodo)

module.exports = router
