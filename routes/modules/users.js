const express = require("express");
const router = express.Router();
const userDB = require("../../models/userDB");
const passport = require("passport");
const bcrypt = require("bcryptjs");
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

//* 註冊驗證
//? 用FB的帳號所使用的信箱 就只能用FB登入了不能再用普通登入的吧
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.render("register", {
      name,
      email,
      errors: "密碼與確認密碼不相同！",
    });
  }

  userDB.findOne({ email }).then((user) => {
    if (user) {
      return res.render("register", {
        name,
        email,
        errors: "該信箱已經註冊過了！",
      });
    }
  });
  const userName = name ? name : email.split("@")[0];
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) => userDB.create({ name: userName, password: hash, email }))
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//*  登出
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "你已經成功登出。");
    res.redirect("/users/login");
  });
});

module.exports = router;
