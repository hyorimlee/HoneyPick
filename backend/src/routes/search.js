const { Router } = require('express')
const searchRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Collection,Item } = require('../models')
const { authAccessToken } = require('./auth')

async function searchItem(keyword, page, res){
    try {
        const search = await Item.find({$text: {$search:keyword}},{score:{$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).skip((page-1)*18).limit(18)
        return search
    } catch (err) {
        console.log(err)
        return res.status(500).send({err:err.message})
    }   
}

async function searchCollection(keyword, res){
    try {
        const search = await Collection.find({$text: {$search:keyword}},{score:{$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
        return search
    } catch (err) {
        console.log(err)
        return res.status(500).send({err:err.message})
        
    }
}

searchRouter.post('/', authAccessToken, async (req, res) => {
    try {
        const {keyword} = req.body        
        let { page=1 } = req.query
        page = parseInt(page)

        const [items,collections] = await Promise.all([
            searchItem(keyword, page, res),
            searchCollection(keyword, res)
        ])
        
        return res.status(200).send({ items, collections, page })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports =  searchRouter