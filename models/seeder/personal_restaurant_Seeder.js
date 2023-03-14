if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const db = require("../../config/mongoose");
const userDB = require("../userDB");
const restaurantDB = require("../restaurantDB");
const bcrypt = require("bcryptjs");
const restaurants = require("./restaurant.json").results;
const users = [
  { email: "user1@example.com", password: "12345678" },
  { email: "user2@example.com", password: "12345678" },
];

db.once("open", () => {
  //確保 map 完成後才關閉終端機
  Promise.all(
    users.map((user, index) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => userDB.create({ email: user.email, password: hash }))
        .then((user) => {
          const userId = user._id;
          //確保餐廳建完檔才進行下一次的LOOP， 沒有這層promise，因為回乎所以不會被確保完成。
          return Promise.all(
            Array.from(
              restaurants.slice(index * 3, index * 3 + 3),
              (restaurant) => restaurantDB.create({ ...restaurant, userId })
            )
          );
        })
        .catch((err) => console.log(err));
    })
  )
    .then(() => {
      console.log("seeder done!");
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
});
