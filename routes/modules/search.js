const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurantDB");

router.get("/", (req, res) => {
  const userId = res.locals.user._id;
  //* 利用正規表達式的方式改寫搜尋條件
  const keyword = req.query.keyword.trim();
  const regex = new RegExp(keyword, "gi");

  if (!keyword || !keyword.length) {
    return res.redirect("/");
  }
  restaurantDB
    .find({
      userId,
      $or: [{ name: regex }, { name_en: regex }, { category: regex }],
    })
    .lean()
    .then((restaurants) => res.render("index", { restaurants, keyword }));
});

module.exports = router;
