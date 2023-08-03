const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    permission: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    name:{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },    
    cart: [{type: Schema.Types.ObjectId, ref: 'Product', default: null}],
    orderHistory: [{type: Schema.Types.ObjectId, ref: 'Order', default: null}],
    phoneNumber: {type: String},
    address: { 
        city: {type: String},
        street: {type: String},
        country: {type: String},
        postalCode: {type: String},
    },
    creditCard: {type: String},
    usedProducts: {type: String}
})

const User = mongoose.model('User', userSchema)
module.exports = User