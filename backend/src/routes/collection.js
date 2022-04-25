const { Router } = require('express')
const collectionRouter = Router()
// const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User, Collection } = require('../models')

collectionRouter.post('/', async (req, res) => {
    try {
        const { title, description } = req.body


        // await collection.save()
        return res.status(201).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

collectionRouter.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const collections = await Collection.find({ user: userId })
        // 컬렉션 목록 조회
        // 페이지네이션 필요할 듯
        
        return res.status(200).send({ collections })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

collectionRouter.get('/:collectionId', async (req, res) => {
    try {
        const { collectionId } = req.params
        const collection = await Collection.findById(collectionId)
        return res.status(200).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


collectionRouter.patch('/:collectionId', async (req, res) => {
    try {
        const { collectionId } = req.params
        const collection = await Collection.findOneAndUpdate({ _id: collectionId }, ...req.body, { new: true })
        return res.status(200).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

collectionRouter.delete('/:collectionId', async (req, res) => {
    try {
        const { collectionId } = req.params
        const collection = await Collection.findOneAndDelete({ _id: collectionId })
        return res.status(204).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = { collectionRouter }