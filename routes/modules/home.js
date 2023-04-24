const express = require("express");
const router = express.Router();

const restaurantDB = require("../../models/restaurantDB");
router.get("/", (req, res) => {
  const userId = res.locals.user._id;
  restaurantDB
    .find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants }));
});

module.exports = router;
