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
      await TodolistModel.create(req.body.Todo)
      return res.json({ msg: 'success', statusCode: 0 })
    } catch (err) {
      return res.json({ err: 'server error', statusCode: 1 })
    }
  }

  const updateTodolists = async (req, res) => {
    try {
      await TodolistModel.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
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

      module.exports = { getMyTodolists, addTodolist, updateTodolists, deleteTodolist }
