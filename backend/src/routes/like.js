const { Router } = require('express')
const likeRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User, Collection } = require('../models')

// NOT MVP
likeRouter.post('/:collectionId', async (req, res) => {
    try {
        const user = null
        const collection = null
        // 컬렉션 찜
        
        return res.status(200).send({ message: '성공' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

likeRouter.get('/', async (req, res) => {
    try {
        const like_collections = null
        // 찜 목록 조회

        return res.status(200).send({ like_collections })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

likeRouter.delete('/:collectionId', async (req, res) => {
    try {
        const user = null
        const collection = null
        // 컬렉션 찜 삭제
        
        return res.status(200).send({ message: '성공' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = {
    likeRouter
}