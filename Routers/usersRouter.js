const express = require('express')
const router = express.Router()

router.post('/signup', (req, res) => {
  if (req.password.length < 8) {
    res.json({ msg: 'Invalid Password', code: 0 })
  } else {
    res.json({ msg: 'Sign up successful', code: 1 })
  }
})

router.post('/signup', (req, res) => {})
router.get('/signin', (req, res) => {
  res.sendStatus(401)
  res.send('welcome to MA^2')
})

router.post('/Home', (req, res) => {
  res.send('Welcome to Homepage')
})

module.exports = router
