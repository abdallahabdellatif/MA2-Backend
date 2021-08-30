const express = require('express')
const router = express.Router()

router.post('/lists', (req, res) => {
  res.send('list added successfully')
})

router.get('/addnewtask', (req, res) => {
  res.send('add your task')
})

router.post('/deletelist', (req, res) => {
  res.send('list deleted')
})

router.post('/deletetask', (req, res) => {
  res.send('task deleted')
})

module.exports = router
