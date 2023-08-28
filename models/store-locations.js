const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreLocationsSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  phone_area_code: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const StoreLocations = mongoose.model("StoreLocations", StoreLocationsSchema);
module.exports = StoreLocations;
