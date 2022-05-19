const { Router } = require('express')
const searchRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Collection,Item } = require('../models')
const { authAccessToken } = require('./auth')

async function searchItem(keyword, page, res){
    try {
        let result=new Set()
        for(let i=0;i<keyword.length;i++){            
            const search = await Item.find({title: new RegExp(keyword[i])})
            for(let j=0;j<search.length;j++) result.add(search[i])
        }
        console.log("***************************************")
        return [...result]
    } catch (err) {
        console.log(err)
        return res.status(500).send({err:err.message})
    }   
}

async function searchCollection(keyword, res){
    try {
        let result=new Set()
        for(let i=0;i<keyword.length;i++){    
            let search = await Item.find({title: new RegExp(keyword[i])})
            for(let j=0;j<search.length;j++) result.add(search[i])
            search = await Item.find({description:new RegExp(keyword[i])})
            for(let j=0;j<search.length;j++) {
                if(search[i].description)result.add(search[i])
            }
        }
        console.log(result)
        return [...result]
    } catch (err) {
        console.log(err)
        return res.status(500).send({err:err.message})
        
    }
}

searchRouter.post('/', authAccessToken, async (req, res) => {
    try {
        let {keyword} = req.body        
        let { page=1 } = req.query
        page = parseInt(page)
        keyword = keyword.split(" ");
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