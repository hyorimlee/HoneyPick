const { Router } = require('express')
const searchRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Collection,Item } = require('../models')
const { authAccessToken } = require('./auth')

async function searchItem(keyword){
    try {
        const search = await Item.find({$text: {$search:keyword}},{score:{$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
        return search    
    } catch (err) {
        console.log(err)
        return res.status(500).send({err:err.message})
    }   
}
async function searchCollection(keyword){
    try {
        const search = await Collection.find({$text: {$search:keyword}},{score:{$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
        return search    
    } catch (err) {
        console.log(err)
        return res.status(500).send({err:err.message})
        
    }
}
searchRouter.post('/', async (req, res) => {
    try {
        const {keyword} = req.body        
        const [items,collections] = await Promise.all([
            searchItem(keyword),
            searchCollection(keyword)
        ])
        return res.status(200).send({ items:items,collections:collections })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


module.exports =  searchRouter