const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurantDB");

router.get("/", (req, res) => {
  const userId = res.locals.user._id;
  const keyword = req.query.keyword.trim().toLowerCase();
  if (!keyword || !keyword.length) {
    return res.redirect("/");
  }
  restaurantDB
    .find({ userId })
    .lean()
    .then((restaurants) => {
      const filteredList = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword)
      );

      res.render("index", { restaurants: filteredList, keyword });
    });
});

module.exports = router;
