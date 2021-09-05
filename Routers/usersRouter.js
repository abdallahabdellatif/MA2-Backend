const express = require("express");
const joi = require("Joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  addUser,
  signOut,
  signIn,
  getMyNotes,
} = require("../Controllers/user.controller");
const {
  validateSignin,
  validateSignup,
} = require("../Validation/user.validator");

//router.post("/signup", addUser);

router.post("/getmynotes", getMyNotes);
router.post("/signout", signOut);
router.post("/signup", validateSignup, addUser);
router.post("/signin", validateSignin, signIn);
router.post("/Home", (req, res) => {
  res.send("Welcome to Homepage");
});

module.exports = router;
