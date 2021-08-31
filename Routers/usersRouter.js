const express = require('express')
const router = express.Router()
const { addUser } = require('../Controllers/user.controller')
const UserModel = require('../Models/user.model')
router.post('/signup', addUser)

router.post('/signup', (req, res) => {})
router.get('/signin', (req, res) => {
  res.sendStatus(401)
  res.send('welcome to MA^2')
})

router.post('/Home', (req, res) => {
  res.send('Welcome to Homepage')
})

module.exports = router
