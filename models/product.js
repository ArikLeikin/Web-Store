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
    type: String,
    required: true,
  },
  condition: {
    // new/used
    type: String,
    required: true,
    enum: ["new", "used"],
  },
  category: {
    type: String,
    required: true,
  },
  manufacture_date: {
    type: Date,
    required: true,
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "Supplier",
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  age_range: {
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: Number,
      required: true,
    },
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
