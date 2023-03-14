const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurantDB");

router.get("/:id", (req, res) => {
  const _id = req.params.id;
  restaurantDB
    .findById(_id)
    .lean()
    .then((restaurant) => res.render("detail", { restaurant }))
    .catch((err) => console.log(err));
});
module.exports = router;
