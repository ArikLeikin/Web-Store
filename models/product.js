const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Price must be greater than 0.",
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  condition: {
    // new/used
    type: String,
    required: true,
    enum: ["New", "Used"], // Changed!!!!!!!
  },
  category: {
    type: String,
    required: true,
  },
  added_date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
  },
  age_range: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
