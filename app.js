const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes");
const method_override = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const usePassport = require("./config/passport");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/mongoose");
const PORT = process.env.PORT;
const app = express();

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(method_override("_method"));
app.use(flash());
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);
usePassport(app);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;

  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.errors = req.flash("errors");
  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
