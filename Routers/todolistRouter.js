const express = require('express')
const { getMyTodolists, addTodolist, updateTodolist, deleteTodolist } = require('../Controllers/todolist.controller')
const {validateAddTodolist,validateUpdateTodolist} = require('../Validation/todolistsValidation')
const router = express.Router()

router.post('/todolists',  getMyTodolists)

router.post('/addnewlist',validateAddTodolist, addTodolist)

router.post('/deletelist',  deleteTodolist)

router.post('/updatelistTitle', validateUpdateTodolist , updateTodolist)

module.exports = router