const request = require('supertest')
const app = require('../src/app')
const Order = require('../src/models/order')
const { setupDatabase } = require('./db')

beforeEach(setupDatabase)

test('Should add a new order', async () => {
    const response = await request(app).post('/api/orders').send({
        user:{
            userId: "u1",
            userName: "pooja"
        },
        orderDate: "2020-04-19T12:01:54.408+00:00",
        status: "Processed",
        products: [],
        total: 100,
        shipping:{
            name: "pooja",
            address: "pune",
            city: "pune"
        }
    }).expect(201)

    const order = await Order.findById(response.body.order._id)
    expect(order).not.toBeNull()   
})

test('Should get orders', async () => {
    await request(app)
        .get('/api/orders')
        .send()
        .expect(200)
})