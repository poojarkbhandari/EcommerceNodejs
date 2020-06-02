const request = require('supertest')
const app = require('../src/app')
const Product = require('../src/models/product')
const { setupDatabase } = require('./db')

beforeEach(setupDatabase)

test('Should add a new product', async () => {
    const response = await request(app).post('/api/product').send({
        title: "cake",
        itemPrice: 40,
        quantity: 5,
        category: "bread",
        inStock: true
    }).expect(201)

    const product = await Product.findById(response.body.product._id)
    expect(product).not.toBeNull()   
})

test('Should get products', async () => {
    await request(app)
        .get('/api/product')
        .send()
        .expect(200)
})