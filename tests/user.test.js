const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/api/users').send({
        name: 'pooja1',
        email: 'pooj1@gmail.com',
        password: 'pooja1234',
        address: 'pune',
        contact: 1234567890,
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()   

    expect(response.body).toMatchObject({
        user: {
            name: 'pooja1',
            email: 'pooj1@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('pooja1234')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/api/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existing user', async () => {
    await request(app).post('/api/users/login').send({
        email: userOne.email,
        password: 'password'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/api/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
    await request(app)
        .delete('/api/users/me')
        .send()
        .expect(401)
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Shweta'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Shweta')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            age: 20
        })
        .expect(400)
})
