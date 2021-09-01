const express = require('express')
const { getMyTodos, addTodo, updateTodo, deleteTodo } = require('../Controllers/todo.controller')
const {validateAddTodo, validateUpdateTodo} = require('../Validation/todoValidation')
const router = express.Router()

router.post('/todos',  getMyTodos)

router.post('/addnewtask',validateAddTodo, addTodo)

router.post('/deletetask',  deleteTodo)

router.post('/updatetask', validateUpdateTodo, updateTodo)

module.exports = router
