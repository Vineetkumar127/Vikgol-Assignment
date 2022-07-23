const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const bookinventoryModel = new mongoose.Schema({
    bookid: {
        type: String,
        required: true
    },
    authors:{
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    storeId:{
        type:ObjectId,
        ref:"bookStore",
        required:true
    },
    stock: {
        type: Number
    },
    outOfStock: {
        type: Boolean

    },
    isDeleted:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })

module.exports = mongoose.model('bookInventory', bookinventoryModel)