const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  lastEdited: Date,
  isPinned: Boolean,
})

noteSchema.set('toJSON', { virtuals: true })
noteSchema.set('toObject', { virtuals: true })
module.exports = mongoose.model('Notes', noteSchema)
