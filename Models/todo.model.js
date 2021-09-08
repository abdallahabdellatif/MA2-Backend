const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  content: String,
  priority: Number,
  isComplete: Boolean,
})
module.exports = mongoose.model('Todo', todoSchema)
