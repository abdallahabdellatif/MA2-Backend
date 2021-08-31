const NoteModel = require('../Models/note.model')

const getMyNotes = async (req, res) => {
  try {
    // console.log(req.body)
    const data = await NoteModel.find({})
    return res.json({ msg: 'success', statusCode: 0, data })
  } catch (err) {
    // console.log(err)
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const addNote = async (req, res) => {
  try {
    req.body.Note.lastEdited = new Date()
    // console.log(req.body)
    await NoteModel.create(req.body.Note)
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    // console.log(err)
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const updateNote = async (req, res) => {
  try {
    // console.log(req.body)
    const note = await NoteModel.findById(req.body.id)
    // console.log(note)
    const edited =
      note.title !== req.body.title || note.content !== req.body.content
    await NoteModel.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      content: req.body.content,
      lastEdited: edited ? new Date() : note.lastEdited,
    })
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    // console.log(err)
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const deleteNote = async (req, res) => {
  try {
    // console.log(req.body)
    await NoteModel.findByIdAndDelete(req.body.id)
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    // console.log(err)
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

module.exports = { getMyNotes, addNote, updateNote, deleteNote }
