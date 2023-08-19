const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionEnum = ["admin", "user", "supplier"];

const userSchema = new Schema({
  permission: {
    type: String,
    required: true,
    enum: permissionEnum,
    default: "user",
  },
  username: { type: String, required: true }, // remove
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order", default: null }],
  phoneNumber: { type: String },
  address: {
    city: { type: String },
    street: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  creditCard: {
    card_number: { type: String },
    holder_name: { type: String },
    expiration_date: { type: String },
    ccv: { type: String },
  },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  usedProducts: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => value > 0,
          message: "Price must be greater than 0.",
        },
      },
      image: { type: String, required: true }, // You can use a URL or a file path to the image
      condition: { type: String, required: true }, // E.g., "used", "like new", etc.
      // Add any other properties specific to used products that you want to store
    },
  ],
  wishlist: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
