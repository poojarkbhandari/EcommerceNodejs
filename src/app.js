const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const orderRouter = require('./routers/order')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(productRouter)
app.use(orderRouter)

module.exports = app