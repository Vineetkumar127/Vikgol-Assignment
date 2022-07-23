const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
        enum: ["Mr","Mrs","Miss"],
        trim:true
    },
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    },

    address: {
        street: String,
        city: String,
        pincode: String
    },


},{ timestamps: true })



module.exports = mongoose.model('createUser', userSchema)