const mongoose = require('mongoose')

const todoListSchema = new mongoose.Schema({
  title: String,
  todos: Array,
})

module.exports = mongoose.model('TodoList', todoListSchema)
