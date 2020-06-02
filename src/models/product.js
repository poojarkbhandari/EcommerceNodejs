const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    itemPrice:{
        type: Number,
        required: true,
        validate(value){
            if(value < 0){
                throw new Error('Price must be a positive number')
            }
        }
    },
    quantity:{
        type: Number,
        required: true,
        validate(value){
            if(value < 0){
                throw new Error('Quantity must be a positive number')
            }
        }
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    inStock:{
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product;