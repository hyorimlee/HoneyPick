const { Router } = require('express')
const recommendRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Item } = require('../models')

// NOT MVP
recommendRouter.get('/', async (req, res) => {
    try {
        const recommend = null
        // 컬렉션 추천
        
        return res.status(200).send({ recommend })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

recommendRouter.get('/', async (req, res) => {
    try {
        const recommend = null
        // 아이템 추천

        return res.status(200).send({ recommend })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = {
    recommendRouter
}