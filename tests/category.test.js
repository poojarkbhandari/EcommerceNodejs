const request = require('supertest')
const app = require('../src/app')
const Category = require('../src/models/category')
const { setupDatabase } = require('./db')

beforeEach(setupDatabase)

test('Should add a new category', async () => {
    const response = await request(app).post('/api/category').send({
        category_name: 'pooja1'
    }).expect(201)

    const category = await Category.findById(response.body.category._id)
    expect(category).not.toBeNull()   
})

test('Should get categories', async () => {
    await request(app)
        .get('/api/category')
        .send()
        .expect(200)
})