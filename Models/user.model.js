const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  phone: String,
  name: String,
  email: String,
  password: String,
  lists: Array,
  Notes: Array,
})
//userSchema.populate('TodoList')
userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })
module.exports = mongoose.model('users', userSchema)
