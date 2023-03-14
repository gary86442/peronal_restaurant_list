const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true, max: 5, min: 1 },
  name_en: { type: String },
  image: { type: String },
  location: { type: String },
  phone: { type: String },
  google_map: { type: String },
  description: { type: String },
  userId: { type: String },
});

module.exports = mongoose.model("restaurant", restaurantSchema);
