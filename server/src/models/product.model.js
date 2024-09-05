const mongoose = require('mongoose')

var {Schema} = mongoose

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    productImage:{
        type:String,
        required:true
    },
    user: {
        type: Schema.Types.String,
        ref: "User",
    }

}, {timestamps: true})

const Products = mongoose.model('Product', productSchema)

module.exports= Products