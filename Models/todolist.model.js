const mongoose = require('mongoose')

const todoListSchema = new mongoose.Schema({
  title: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
})

module.exports = mongoose.model('TodoList', todoListSchema)
