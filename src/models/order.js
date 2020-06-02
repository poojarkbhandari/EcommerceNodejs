const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user:{
        type: Object
    },
    orderDate:{
        type: Date,
        required:true
    },
    status:{
        type: String,
        required: true,
        trim: true
    },
    products:{
        type: Array,
        required: true
    },
    total:{
        type: Number,
        required: true,
        validate(value){
            if(value < 10){
                throw new Error('Total must be a positive number.')
            }
        }
    },
    shipping:{
        type: Object
    }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order