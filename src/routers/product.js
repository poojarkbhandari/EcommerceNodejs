const express = require('express')
const Product = require ('../models/product')
const router = new express.Router()

router.post('/api/product', async (req, res) => {
    const product = new Product(req.body)

    try{
        await product.save()
        res.status(201).send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/api/product', async (req, res) => {
    
    try{
        const products = await Product.find({})
        res.send(product)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/api/product/:id', async (req, res) => {
    const _id = req.param._id

    try{
        const product = await Product.findById(_id)

        if(!product){
            return res.status(404).send()
        }

        res.send(product)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/api/product/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'itemPrice', 'quantity', 'category', 'inStock']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try{
        const product = await Product.findByIdAndUpdate(req.param.id, req.body, {new: true, runValidators: true})
            
        if(!product){
            return res.status(404).send()
        }

        res.send(product)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/api/product/:id', async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.param.id)

        if(!product){
            return res.status(404).send()
        }

        res.send(product)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router