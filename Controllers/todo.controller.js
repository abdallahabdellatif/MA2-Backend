const TodoModel = require('../Models/todo.model')

const getMyTodos = async (req, res) => {
    try {
      const data = await TodoModel.find({})
      return res.json({ msg: 'success', statusCode: 0, data })
    } catch (err) {
      return res.json({ err: 'server error', statusCode: 1 })
    }
  }

  const addTodo = async (req, res) => {
    try {
     const newTodo = await TodoModel.create(req.body.Todo)
      return res.json({ msg: 'success', statusCode: 0 })
    } catch (err) {
      return res.json({ err: 'server error', statusCode: 1 })
    }
  }

  const updateTodo = async (req, res) => {
    try {
      await NoteModel.findByIdAndUpdate(req.body.id, {
        content: req.body.content,
      })
      return res.json({ msg: 'success', statusCode: 0 })
    } catch (err) {
      return res.json({ err: 'server error', statusCode: 1 })
    }
      }

      const deleteTodo = async (req, res) => {
        try {
          await TodoModel.findByIdAndDelete(req.body.id)
          return res.json({ msg: 'success', statusCode: 0 })
        } catch (err) {
          return res.json({ err: 'server error', statusCode: 1 })
        }
      }

      module.exports = { getMyTodos, addTodo, updateTodo, deleteTodo }
