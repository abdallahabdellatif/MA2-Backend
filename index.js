const mongoose = require('mongoose')
const connectDB = require('./database')

const express = require('express')
const app = express()
const usersRouter = require('./Routers/usersRouter')
const todoRouter = require('./Routers/todoRouter')
const notesRouter = require('./Routers/notesRouter')
app.use(express.json())

app.use('/users', usersRouter)
app.use('/notes', notesRouter)
app.use('/todo', todoRouter)

app.listen(3000)

connectDB()
