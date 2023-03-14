const express = require("express");
const router = express.Router();
const userDB = require("../../models/userDB");
const restaurantDB = require("../../models/restaurantDB");

router.get("/", (req, res) => {
  restaurantDB
    .find({})
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants }));
});
module.exports = router;
