const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category_name:{
        type: String,
        required: true,
        trim: true
    }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
