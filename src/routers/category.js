const express = require('express')
const Category = require('../models/category')
const router = new express.Router()

router.post('/api/category', async (req, res) => {
    const category = new Category(req.body)

    try{
        await category.save()
        res.status(201).send(category)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/api/category', async (req, res) => {
    
    try{
        const categories = await Category.find({})
        res.send(categories)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/api/category/:id', async (req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.param.id)

        if(!category){
            return res.status(404).send()
        }

        res.send(category)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router