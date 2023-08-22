const { ObjectId } = require("bson");
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
  image: {
    // NEED TO CHECK if url/file
    type: [Buffer],
    required: true,
  },
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
  },
  // supplier: {
  //   type: ObjectId, // check if worth adding a prefix for user - U/ supplier - S
  //   required: true,
  // },
  quantity: {
    type: Number,
  },
  age_range: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
