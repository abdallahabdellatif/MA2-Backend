const TodolistModel = require('../Models/todolist.model')
const TodoModel = require('../Models/todo.model')

const getMyTodos = async (req, res) => {
  try {
    const list = await TodolistModel.findById(req.body.id).populate('todos')
    console.log(list)
    return res.json({ msg: 'success', statusCode: 0, list })
  } catch (err) {
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const addTodo = async (req, res) => {
  try {
    const newTodo = await TodoModel.create(req.body.Todo)
    // const newList = await TodolistModel.create(req.body.Todolist)
    // const userId = req.payload.id
    const list = await TodolistModel.findById(req.body.Todo.listId)
    list.todos.push(newTodo.id)
    await list.save()
    // user.notes.pusj(newNote.id)
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const updateTodo = async (req, res) => {
  try {
    console.log(req.body.Todo.id)
    await TodoModel.findByIdAndUpdate(req.body.Todo.id, {
      content: req.body.Todo.content,
    })
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const deleteTodo = async (req, res) => {
  try {
    await TodoModel.findByIdAndDelete(req.body.Todo.id)
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

module.exports = { getMyTodos, addTodo, updateTodo, deleteTodo }
