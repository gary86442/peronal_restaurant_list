const express = require("express");
const router = express.Router();
const userDB = require("../../models/userDB");
const passport = require("passport");
//* 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

//*  驗證登入
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

//* 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// TODO 註冊驗證
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  userDB
    .findOne({ email })
    .then((user) => {
      if (!user) {
        userDB.create({ name, password, email });
      }
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//*  登出
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect("/users/login");
});

module.exports = router;
