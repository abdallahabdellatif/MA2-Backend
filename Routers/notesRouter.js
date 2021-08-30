const express = require('express')
const router = express.Router()

router.get('/addnewnote', (req, res) => {
  res.send('add your note')
})

router.post('/deletenote', (req, res) => {
  res.send('note deleted')
})

module.exports = router
