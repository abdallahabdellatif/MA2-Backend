const NoteModel = require('../Models/note.model')
const UserModel = require('../Models/user.model')

// const getMyNotes = async (req, res) => {
//   try {
//     // console.log(req.body)
//     const data = await NoteModel.find({})
//     return res.json({ msg: 'success', statusCode: 0, data })
//   } catch (err) {
//     // console.log(err)
//     return res.json({ err: 'server error', statusCode: 1 })
//   }
// }

const addNote = async (req, res) => {
  try {
    req.body.Note.lastEdited = new Date()
    // console.log(req.body)
    const newNote = await NoteModel.create(req.body)
    const userId = req.payload.id
    const user = await UserModel.findById(userId)
    user.Notes.push(newNote.id)
    await user.save()
    // user.notes.pusj(newNote.id)
    return res.json({ message: 'Note added successfully', statusCode: 0 })
  } catch (err) {
    console.log(err)
    return res.json({ error: 'server error', statusCode: 1 })
  }
}

const updateNote = async (req, res) => {
  try {
    // console.log(req.body)
    const note = await NoteModel.findById(req.body.id) //id of the note
    if (!note) {
      return res.json({ error: 'ID not found', statusCode: 1 })
    }
    // console.log(note)
    const edited =
      note.title !== req.body.title || note.content !== req.body.content
    await NoteModel.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      content: req.body.content,
      lastEdited: edited ? new Date() : note.lastEdited,
    })
    return res.json({ message: 'Note updated successfully', statusCode: 0 })
  } catch (err) {
    // console.log(err)
    return res.json({ error: 'server error', statusCode: 1 })
  }
}

const deleteNote = async (req, res) => {
  try {
    // console.log(req.body)
    //const userId = "d3r";
    const userId = req.payload.id
    const del = await NoteModel.findByIdAndDelete(req.body.id) //id of the note
    if (!del) return res.json({ error: 'Resource not found', statusCode: 1 })

    // const user = await UserModel.findById(userId)
    // user.Notes = user.Notes.filter((id) => id !== req.body.id)
    // await user.save()
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { Notes: { $in: [req.body.id] } },
    })
    return res.json({ message: 'Note deleted successfully', statusCode: 0 })
  } catch (err) {
    // console.log(err)
    return res.json({ error: 'server error', statusCode: 1 })
  }
}

module.exports = { addNote, updateNote, deleteNote }
