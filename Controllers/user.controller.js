const UserModel = require("../Models/user.model");
const NoteModel = require("../Models/note.model");
const ListModel = require("../Models/todolist.model");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const user = req.body.User;
    const data = await UserModel.findOne({ email: user.email });
    if (data) {
      return res.json({ statusCode: 1, message: "Error" });
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      console.log(user);
      await UserModel.create(user);
      return res.json({
        statusCode: 0,
        message: "Success",
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

const signIn = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.User.email;
    const password = req.body.User.password;
    const phone = req.body.User.phone;
    const data = await UserModel.findOne({ email: email });

    console.log("hi", data);
    if (data) {
      const validPassword = await bcrypt.compare(password, data.password);
      if (validPassword) {
        return res.json({
          statusCode: 0,
          message: "Success",
        });
      } else {
        return res.json({
          statusCode: 1,
          message: "Error",
        });
      }
    } else {
      return res.json({
        statusCode: 1,
        message: "Error",
      });
    }

    return res.json({
      statusCode: 0,
      message: "Success",
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "exception",
    });
  }
};

const getMyNotes = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body.User.id;
    const data = await UserModel.findById(userId).populate("Notes");
    console.log(data.Notes);
    return res.json({ msg: "success", statusCode: 0, data: data.Notes });
  } catch (err) {
    // console.log(err)
    return res.json({ err: "server error", statusCode: 1 });
  }
};

const getMyLists = async (req, res) => {
  try {
    // console.log(req.body)
    const userId = req.body.User.id;
    const data = await ListModel.find({ _id: userId });
    return res.json({ msg: "success", statusCode: 0, data });
  } catch (err) {
    // console.log(err)
    return res.json({ err: "server error", statusCode: 1 });
  }
};

// const addNote = async (req, res) => {
//   try {
//     console.log(req.body);
//     await UserModel.create(req.body.Note);
//     return res.json({
//       statusCode: 0,
//       message: "Success",
//     });
//   } catch (exception) {
//     console.log(exception);
//     return res.json({
//       statusCode: 1,
//       error: "exception",
//     });
//   }
// };
// const addList = async (req, res) => {
//   try {
//     console.log(req.body);
//     await UserModel.create(req.body.List);
//     return res.json({
//       statusCode: 0,
//       message: "Success",
//     });
//   } catch (exception) {
//     console.log(exception);
//     return res.json({
//       statusCode: 1,
//       error: "exception",
//     });
//   }
// };
// const addTask = async (req, res) => {
//   try {
//     console.log(req.body);
//     await UserModel.create(req.body.Task);
//     return res.json({
//       statusCode: 0,
//       message: "Success",
//     });
//   } catch (exception) {
//     console.log(exception);
//     return res.json({
//       statusCode: 1,
//       error: "exception",
//     });
//   }
// };

module.exports = { getMyNotes, addUser, getMyLists, signIn };
