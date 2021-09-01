const express = require("express");
const {
  addNote,
  updateNote,
  deleteNote,
} = require("../Controllers/note.controller");
const {
  validateAddNote,
  validateUpdateNote,
  validateDeleteNote,
} = require("../Validation/notesValidation");
const router = express.Router();

//router.get('/getmynotes', getMyNotes)

router.post("/addnote", validateAddNote, addNote);
router.post("/updatenote", validateUpdateNote, updateNote);
router.post("/deletenote", validateDeleteNote, deleteNote);

module.exports = router;
