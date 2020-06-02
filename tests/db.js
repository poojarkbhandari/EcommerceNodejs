const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../src/models/user')
const Category = require('../src/models/category')
const Product = require('../src/models/product')
const Order = require('../src/models/order')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    "name": "pooja2",
	"email": "pooja2@gmail.com",
	"password": "pooja1234",
	"address": "pune",
	"contact": 1234567890,
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await Category.deleteMany()
    await new Category.save()
    await Product.deleteMany()
    await new Product.save()
    await Order.deleteMany()
    await new Order.save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}