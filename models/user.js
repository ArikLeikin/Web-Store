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
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    streetNumber: { type: Number, default: "" },
    country: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
  },
  creditCard: {
    card_number: { type: String, default: "" },
    holder_name: { type: String, default: "" },
    expiration_date: { type: String, default: "" },
    ccv: { type: String, default: "" },
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
  interested: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      socketId: { type: String, required: true },
    },
  ],
  points: {
    type: Number,
    default: 10,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
