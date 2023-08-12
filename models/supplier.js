const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: { type: String, required: true },
  availableProducts: [
    { type: Schema.Types.ObjectId, ref: "Product", default: null },
  ],
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
