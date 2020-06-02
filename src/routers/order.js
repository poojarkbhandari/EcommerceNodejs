const express = require('express')
const Order = require('../models/order')
const router = new express.Router()

router.post('/api/orders', async (req, res) => {
    const order = new Order(req.body)

    try{
        await order.save()
        res.status(201).send(order)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/api/orders', async (req, res) => {
    
    try{
        const orders = await Order.find({})
        res.send(orders)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/api/orders/:id', async (req, res) => {
    const _id = req.param._id

    try{
        const order = await Orders.findById(_id)

        if(!order){
            return res.status(404).send()
        }

        res.send(order)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/api/orders/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['user', 'status', 'shipping']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const order = await Order.findByIdAndUpdate(req.param.id, req.body, {new: true, runValidators: true})
            
        if(!order){
            return res.status(404).send()
        }

        res.send(order)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/api/orders/:id', async (req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.param.id)

        if(!order){
            return res.status(404).send()
        }

        res.send(order)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router