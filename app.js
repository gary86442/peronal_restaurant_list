const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes");
const method_override = require("method-override");
const session = require("express-session");
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
  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
