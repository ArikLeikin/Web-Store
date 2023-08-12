const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_info: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
  ],
  total_price: {
    type: Number,
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "Total price must be greater than 0.",
    },
    required: true,
  },
  order_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Custom validator function to check that the products array is not empty
function atLeastOneProductValidator(value) {
  return value.length > 0;
}

// Adding the custom validator to the products field
OrderSchema.path("products").validate(
  atLeastOneProductValidator,
  "At least one product is required."
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
