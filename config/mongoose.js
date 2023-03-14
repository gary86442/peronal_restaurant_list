const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");
});

db.on("error", () => {
  console.error("DB is error!");
});

module.exports = db;
