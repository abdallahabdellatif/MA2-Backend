const TodolistModel = require('../Models/todolist.model')

const getMyTodolists = async (req, res) => {
    try {
      const data = await TodolistModel.find({})
      return res.json({ msg: 'success', statusCode: 0, data })
    } catch (err) {
      return res.json({ err: 'server error', statusCode: 1 })
    }
  }

  const addTodolist = async (req, res) => {
    try {
      await TodolistModel.create(req.body.Todolist)
      return res.json({ msg: 'success', statusCode: 0 })
    } catch (err) {
      return res.json({ err: 'server error', statusCode: 1 })
    }
  }

  const updateTodolist = async (req, res) => {
    try {
      await TodolistModel.findByIdAndUpdate(req.body.Todolist.id, {
        id : req.body.Todolist.id,
        title: req.body.Todolist.title,
      })
      return res.json({ msg: 'success', statusCode: 0 })
    } catch (err) {
      return res.json({ err: 'server error', statusCode: 1 })
    }
      }

      const deleteTodolist = async (req, res) => {
        try {
          await TodolistModel.findByIdAndDelete(req.body.id)
          return res.json({ msg: 'success', statusCode: 0 })
        } catch (err) {
          return res.json({ err: 'server error', statusCode: 1 })
        }
      }

      module.exports = { getMyTodolists, addTodolist, updateTodolist, deleteTodolist }
