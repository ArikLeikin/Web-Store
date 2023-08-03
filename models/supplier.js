const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplierSchema = new Schema({
    name: {type: String},
    availableProducts: [{type: Schema.Types.ObjectId, ref: 'Product', default: null}]
})

const Supplier = mongoose.model('Supllier', supplierSchema)
module.exports = Supplier