const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  content: String,
  priority: Number,
})
module.exports = mongoose.model('Todo', todoSchema)
