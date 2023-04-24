const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const googleStrategy = require("passport-google-oauth20").Strategy;
const userDB = require("../models/userDB");
const bcrypt = require("bcryptjs");
const { randomPassword } = require("../app/randomPassword");

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
          bcrypt.compare(password, user.password).then((isMatched) => {
            if (isMatched) return done(null, user);
            return done(false, null, { message: "帳號或密碼錯誤！" });
          });
        })
        .catch((err) => done(err, null));
    })
  );

  //* 驗證 GOOGLE的登入
  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CB_URI,
        profileFields: ["email", "displayName"],
      },
      (accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json;
        userDB.findOne({ email }).then((user) => {
          if (user) return done(null, user);
          const password = randomPassword();
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hash) => {
              userDB
                .create({ name, email, password: hash })
                .then((user) => done(null, user))
                .catch((err) => done(err, null));
            });
        });
      }
    )
  );
  //* 設定FB的驗證策略
  passport.use(
    new facebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CB_URI,
        profileFields: ["email", "displayName"],
      },
      (accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json;
        userDB.findOne({ email }).then((user) => {
          if (user) return done(null, user);
          const password = randomPassword();
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hash) => {
              userDB
                .create({ name, email, password: hash })
                .then((user) => done(null, user))
                .catch((err) => done(err, null));
            });
        });
      }
    )
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
