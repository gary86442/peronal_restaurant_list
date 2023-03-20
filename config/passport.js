const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const userDB = require("../models/userDB");

module.exports = (app) => {
  //* 初始化passport ， 將exp的session，和passport 連結。
  app.use(passport.initialize());
  app.use(passport.session());

  //* 設定本地端登入驗證策略
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      userDB
        .findOne({ email })
        .then((user) => {
          if (!user) {
            return done(false, null, { message: "該帳號不存在" });
          }
          if (user.password !== password) {
            return done(false, null, { message: "帳號或密碼錯誤" });
          }
          return done(null, user);
        })
        .catch((err) => done(err, null));
    })
  );

  //* 序列化及反序列化
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    userDB
      .findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
