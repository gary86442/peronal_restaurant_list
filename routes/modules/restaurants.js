const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurantDB");

//*處理新增餐廳：
//TODO 新增餐廳的功能尚未關聯到使用者
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/", (req, res) => {
  const restaurant = req.body;
  restaurantDB
    .create({ ...restaurant })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

//* 處理餐廳編輯頁面
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  restaurantDB
    .findById(_id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const newRestaurant = req.body;
  restaurantDB
    .findByIdAndUpdate(_id, { ...newRestaurant })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((err) => console.log(err));
});

//* 處理餐廳詳細頁
router.get("/:id", (req, res) => {
  const _id = req.params.id;
  restaurantDB
    .findById(_id)
    .lean()
    .then((restaurant) => res.render("detail", { restaurant }))
    .catch((err) => console.log(err));
});
module.exports = router;
