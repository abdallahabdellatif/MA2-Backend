const NoteModel = require("../Models/note.model");
const UserModel = require("../Models/user.model");

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
    req.body.Note.lastEdited = new Date();
    // console.log(req.body)
    const newNote = await NoteModel.create(req.body.Note);
    // const userId = "1w34";
    const userId = req.body.Note.userId;
    const user = await UserModel.findById(userId);
    console.log(user);
    user.Notes.push(newNote.id);
    console.log(user);
    await user.save();
    // user.notes.pusj(newNote.id)
    return res.json({ msg: "success", statusCode: 0 });
  } catch (err) {
    console.log(err);
    return res.json({ err: "server error", statusCode: 1 });
  }
};

const updateNote = async (req, res) => {
  try {
    // console.log(req.body)
    const note = await NoteModel.findById(req.body.id); //id of the note
    // console.log(note)
    const edited =
      note.title !== req.body.title || note.content !== req.body.content;
    await NoteModel.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      content: req.body.content,
      lastEdited: edited ? new Date() : note.lastEdited,
    });
    return res.json({ msg: "success", statusCode: 0 });
  } catch (err) {
    // console.log(err)
    return res.json({ err: "server error", statusCode: 1 });
  }
};

const deleteNote = async (req, res) => {
  try {
    // console.log(req.body)
    //const userId = "d3r";
    const userId = req.body.userId;
    await NoteModel.findByIdAndDelete(req.body.id); //id of the note
    const user = await UserModel.findById(userId);
    user.Notes.filter((id) => id !== newNote.id);
    await user.save();
    return res.json({ msg: "success", statusCode: 0 });
  } catch (err) {
    // console.log(err)
    return res.json({ err: "server error", statusCode: 1 });
  }
};

module.exports = { addNote, updateNote, deleteNote };
