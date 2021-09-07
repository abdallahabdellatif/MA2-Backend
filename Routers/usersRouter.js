const express = require("express");
const joi = require("Joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  addUser,
  signUp1,
  signOut,
  signIn,
  getMyNotes,
  getMyLists,
  getUserDetails,
} = require("../Controllers/user.controller");
const {
  validateSignin,
  validateSignup,
  validateUserDetails,
} = require("../Validation/user.validator");

//router.post("/signup", addUser);

router.post("/getmynotes", getMyNotes);
router.post("/getmylists", getMyLists);
router.post("/signout", signOut);
router.post("/userdetails", validateUserDetails, getUserDetails);
router.post("/signup", validateSignup, addUser);
router.post("/signup1", signUp1);
router.post("/signin", validateSignin, signIn);
router.post("/Home", (req, res) => {
  res.send("Welcome to Homepage");
});

module.exports = router;
