const UserModel = require("../Models/user.model");
const NoteModel = require("../Models/note.model");
const ListModel = require("../Models/todolist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addUser = async (req, res) => {
  try {
    const user = req.body.User;
    const data = await UserModel.findOne({ email: user.email });
    if (data) {
      return res.json({
        statusCode: 1,
        error: "Invalid Email,this email already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      console.log(user);
      await UserModel.create(user);
      return res.json({
        statusCode: 0,
        message: "Your account successfully created",
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "Server Error",
    });
  }
};

const signUp1 = async (req, res) => {
  try {
    const user = req.body.User;
    const data = await UserModel.findOne({ email: user.email });
    if (data) {
      return res.json({
        statusCode: 1,
        error: "Invalid Email,this email already exists",
      });
    } else {
      return res.json({
        statusCode: 0,
        message: "Email and Name successfully validated",
      });
    }
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "Server Error",
    });
  }
};

const signIn = async (req, res) => {
  try {
    // console.log(req.body)
    const email = req.body.User.email;
    const password = req.body.User.password;
    const data = await UserModel.findOne({ email: email });
    if (data) {
      const validPassword = await bcrypt.compare(password, data.password);
      if (validPassword) {
        // console.log(process.env);
        const token = await jwt.sign(
          {
            id: data._id,
            email: data.email,
            password: data.password,
          },
          process.env.SECRET,
          {
            expiresIn: "5h",
          }
        );
        res.set("auth", token);
        return res.json({
          statusCode: 0,
          message: "Signed in sucessfully",
          token,
        });
      } else {
        return res.json({
          statusCode: 1,
          error: "Invalid Password",
        });
      }
    } else {
      return res.json({
        statusCode: 1,
        error: "Invalid email,this email does not exist",
      });
    }

    // return res.json({
    //   statusCode: 0,
    //   message: 'Success',
    // })
  } catch (exception) {
    console.log(exception);
    return res.json({
      statusCode: 1,
      error: "Server Error",
    });
  }
};

const getMyNotes = async (req, res) => {
  try {
    // console.log(req.body)
    const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userId = payload.id;
    try {
      const data = await UserModel.findById(userId).populate("Notes");
      console.log(data.Notes);
      return res.json({
        message: "Notes successfully retrieved,now you can view your notes",
        statusCode: 0,
        data: data.Notes,
      });
    } catch (err) {
      // console.log(err)
      return res.json({
        error: "Server Error",
        statusCode: 1,
      });
    }
  } catch (err) {
    // console.log(err)
    return res.json({
      error: "Unauthorised User",
      statusCode: 1,
    });
  }
};

const getMyLists = async (req, res) => {
  try {
    // console.log(req.body)
    console.log("abdooooooo");
    const payload = jwt.verify(req.headers["auth"], process.env.SECRET);
    const userId = payload.id;
    try {
      const data = await UserModel.findById(userId).populate("lists");
      console.log(data);
      return res.json({
        message:
          "Your lists retrieved successfully,now you can view your lists",
        statusCode: 0,
        data: data.lists,
      });
    } catch (err) {
      // console.log(err)
      return res.json({ error: "Server Error", statusCode: 1 });
    }
  } catch (err) {
    // console.log(err)
    return res.json({ error: "Unauthorised User", statusCode: 1 });
  }
};

const signOut = (req, res) => {
  const token = req.headers["auth"];
  try {
    jwt.verify(token, process.env.SECRET);
    return res.json({
      status: 0,
      message: "Signed out successfully",
    });
  } catch (err) {
    return res.json({
      status: 1,
      error: "Unauthorised User",
    });
  }
};
const getUserDetails = async (req, res) => {
  const token = req.headers["auth"];
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return res.json({
        status: 1,
        error: "User Not Found",
      });
    }
    return res.json({
      status: 0,
      message: "Signed out successfully",
      user,
    });
  } catch (err) {
    return res.json({
      status: 1,
      error: "Unauthorised User",
    });
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

module.exports = {
  getMyNotes,
  addUser,
  getMyLists,
  signUp1,
  signIn,
  signOut,
  getUserDetails,
};
