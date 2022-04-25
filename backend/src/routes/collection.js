const { Router } = require('express')
const collectionRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User } = require('../models')

collectionRouter.post('/', async (req, res) => {
    try {
        const collection = null
        // 컬렉션 생성 로직

        return res.status(201).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

collectionRouter.get('/:userId', async (req, res) => {
    try {
        const user = null
        // 컬렉션 목록 조회
        // 페이지네이션 필요할 듯
        const collection = Array(1)
        
        return res.status(200).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

collectionRouter.get('/:collectionId', async (req, res) => {
    try {
        const collection = null
        // 컬렉션 상세 조회
        
        return res.status(200).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


collectionRouter.patch('/:collectionId', async (req, res) => {
    try {
        const collection = null
        // 프로필 수정 로직

        return res.status(200).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

collectionRouter.delete('/:collectionId', async (req, res) => {
    try {
        const collection = null
        // 프로필 삭제 로직

        return res.status(200).send({ collection })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = {
    collectionRouter
}