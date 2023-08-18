const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreLocationsSchema = {
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  phone_area_code: {
    type: Number,
    required: true,
  },
};

const Order = mongoose.model("StoreLocations", StoreLocationsSchema);
module.exports = Order;
