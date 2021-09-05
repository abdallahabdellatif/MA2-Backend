const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoList',
    },
  ],
  Notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notes',
    },
  ],
})
//userSchema.populate('TodoList')
userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })
module.exports = mongoose.model('users', userSchema)
