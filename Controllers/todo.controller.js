const TodolistModel = require('../Models/todolist.model')
const TodoModel = require('../Models/todo.model')

const getMyTodos = async (req, res) => {
  try {
    // console.log(await TodoModel.findById(req.body.id))
    if (!(await TodolistModel.findById(req.body.id)))
      return res.json({ error: "id doesn't belong to a list", statusCode: 1 })
    const list = await TodolistModel.findById(req.body.id).populate('todos')
    console.log(list)

    // list = await TodolistModel.findById(req.body.id)
    return res.json({
      message: 'Tasks retrieved successfully',
      statusCode: 0,
      todos: list,
    })
  } catch (err) {
    return res.json({ error: 'Server Error', statusCode: 1 })
  }
}

const addTodo = async (req, res) => {
  try {
    const list = await TodolistModel.findById(req.body.Todo.listId)
    // console.log(list)
    if (!list) {
      return res.json({
        error: "listId doesn't belong to a list",
        statusCode: 1,
      })
    }
    const newTodo = await TodoModel.create({
      content: req.body.Todo.content,
      priority: req.body.Todo.priority,
      isComplete: req.body.Todo.isComplete,
    })
    // const newList = await TodolistModel.create(req.body.Todolist)
    // const userId = req.payload.id
    list.todos.push(newTodo.id)
    await list.save()
    // user.notes.pusj(newNote.id)
    return res.json({ message: 'Task added successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ error: 'Server Error', statusCode: 1 })
  }
}

const updateTodo = async (req, res) => {
  try {
    // console.log(req.body.Todo.id)
    if (!(await TodoModel.findById(req.body.Todo.id))) {
      return res.json({ error: "id doesn't belong to a task", statusCode: 1 })
    }
    await TodoModel.findByIdAndUpdate(req.body.Todo.id, {
      content: req.body.Todo.content,
      priority: req.body.Todo.priority,
      isComplete: req.body.Todo.isComplete,
    })
    return res.json({ message: 'Task updated successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ error: 'Server Error', statusCode: 1 })
  }
}

const deleteTodo = async (req, res) => {
  try {
    if (!(await TodoModel.findById(req.body.Todo.id)))
      return res.json({ error: "id doesn't belong to a task", statusCode: 1 })
    if (!(await TodolistModel.findById(req.body.Todo.listId)))
      return res.json({
        error: "listId doesn't belong to a list",
        statusCode: 1,
      })
    await TodoModel.findByIdAndDelete(req.body.Todo.id)
    await TodolistModel.findByIdAndUpdate(req.body.Todo.listId, {
      $pull: { todos: { $in: [req.body.Todo.id] } },
    })
    return res.json({ message: 'Task deleted successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ error: 'Server Error', statusCode: 1 })
  }
}

module.exports = { getMyTodos, addTodo, updateTodo, deleteTodo }
