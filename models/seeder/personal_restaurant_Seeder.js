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
  users
    .map((user, index) => {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => userDB.create({ email: user.email, password: hash }))
        .then((user) => {
          const userId = user._id;
          return Promise.all(
            Array.from(
              restaurants.slice(index * 3, index * 3 + 3),
              (restaurant) => {
                console.log(restaurant);
                restaurantDB.create({ ...restaurant, userId });
              }
            )
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      console.log("seeder done!");
      process.exit();
    });
});
