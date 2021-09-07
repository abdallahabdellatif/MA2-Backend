const mongoose = require("mongoose");
const connectDB = require("./database");
const cors = require("cors");

const express = require("express");
const app = express();
const usersRouter = require("./Routers/usersRouter");
const todoRouter = require("./Routers/todoRouter");
const notesRouter = require("./Routers/notesRouter");
const todolistRouter = require("./Routers/todolistRouter");
require("dotenv").config();
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    exposedHeaders: "auth",
  })
);
app.use("/users", usersRouter);
app.use("/", (req, res, next) => {
  try {
    const token = req.headers["auth"];
    console.log("req");
    const resp = jwt.verify(token, process.env.SECRET);
    req.payload = resp;
    // console.log(resp);
    next();
  } catch (err) {
    //   next();
    return res.json({
      statusCode: 1,
      error: "Unauthorised",
    });
  }
});
app.use("/notes", notesRouter);
app.use("/todo", todoRouter);
app.use("/todolist", todolistRouter);

app.listen(8000);

connectDB();
