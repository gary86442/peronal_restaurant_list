const express = require("express");
const router = express.Router();
const userDB = require("../../models/userDB");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

module.exports = router;
