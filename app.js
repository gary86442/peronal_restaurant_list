const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/mongoose");
const PORT = process.env.PORT;
const app = express();

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
