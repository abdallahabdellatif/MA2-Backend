const TodolistModel = require('../Models/todolist.model')
const TodoModel = require('../Models/todo.model')

const getMyTodos = async (req, res) => {
  try {
    // console.log(req.body.id)
    const list = await TodolistModel.findById(req.body.id).populate('todos')
    if (!list)
      return res.json({ err: "id doesn't belong to a list", statusCode: 1 })

    // list = await TodolistModel.findById(req.body.id)
    return res.json({
      msg: 'Tasks retrieved successfully',
      statusCode: 0,
      todos: list.todos,
    })
  } catch (err) {
    return res.json({ err: 'Server Error', statusCode: 1 })
  }
}

const addTodo = async (req, res) => {
  try {
    const list = await TodolistModel.findById(req.body.Todo.listId)
    // console.log(list)
    if (!list) {
      return res.json({ err: "listId doesn't belong to a list", statusCode: 1 })
    }
    const newTodo = await TodoModel.create({
      content: req.body.Todo.content,
      priority: req.body.Todo.priority,
    })
    // const newList = await TodolistModel.create(req.body.Todolist)
    // const userId = req.payload.id
    list.todos.push(newTodo.id)
    await list.save()
    // user.notes.pusj(newNote.id)
    return res.json({ msg: 'Task added successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'Server Error', statusCode: 1 })
  }
}

const updateTodo = async (req, res) => {
  try {
    // console.log(req.body.Todo.id)
    if (!(await TodoModel.findById(req.body.Todo.id))) {
      return res.json({ err: "id doesn't belong to a task", statusCode: 1 })
    }
    await TodoModel.findByIdAndUpdate(req.body.Todo.id, {
      content: req.body.Todo.content,
      priority: req.body.Todo.priority,
    })
    return res.json({ msg: 'Task updated successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'Server Error', statusCode: 1 })
  }
}

const deleteTodo = async (req, res) => {
  try {
    if (!(await TodoModel.findById(req.body.Todo.id)))
      return res.json({ err: "id doesn't belong to a task", statusCode: 1 })
    if (!(await TodolistModel.findById(req.body.Todo.listId)))
      return res.json({ err: "listId doesn't belong to a list", statusCode: 1 })
    await TodoModel.findByIdAndDelete(req.body.Todo.id)
    await TodolistModel.findByIdAndUpdate(req.body.Todo.listId, {
      $pull: { todos: { $in: [req.body.Todo.id] } },
    })
    return res.json({ msg: 'Task deleted successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'Server Error', statusCode: 1 })
  }
}

module.exports = { getMyTodos, addTodo, updateTodo, deleteTodo }
