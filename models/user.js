const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionEnum = ["admin", "user", "supplier"];

const userSchema = new Schema({
  permission: {
    type: String,
    //required: true,
    enum: permissionEnum,
    default: "user",
  },
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
    city: { type: String, default: null },
    street: { type: String, default: null },
    streetNumber: { type: Number, default: null },
    country: { type: String, default: null },
    postalCode: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phoneNumber: { type: String, default: null },
  },
  creditCard: {
    card_number: { type: String, default: null },
    holder_name: { type: String, default: null },
    expiration_date: { type: String, default: null },
    ccv: { type: String, default: null },
  },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  usedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
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
  points: {
    type: Number,
    default: 200,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
