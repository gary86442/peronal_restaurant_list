const express = require("express");
const router = express.Router();
const userDB = require("../../models/userDB");
//* 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// TODO 驗證登入

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
module.exports = router;
