const mongoose = require("mongoose");
const connectDB = require("./database");
const cors = require("cors");

const express = require("express");
const app = express();
const usersRouter = require("./Routers/usersRouter");
const todoRouter = require("./Routers/todoRouter");
const notesRouter = require("./Routers/notesRouter");
const todolistRouter = require("./Routers/todolistRouter");
app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/notes", notesRouter);
app.use("/todo", todoRouter);
app.use("/todolist", todolistRouter);

app.listen(8000);

connectDB();
