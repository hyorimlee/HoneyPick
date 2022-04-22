const { Router } = require('express')
const itemRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Item } = require('../models')

itemRouter.post('/', async (req, res) => {
    try {
        const item = null
        // 아이템 생성 로직

        return res.status(201).send({ item })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.get('/:itemId', async (req, res) => {
    try {
        const item = null
        // 아이템 상세 조회
        
        return res.status(200).send({ item })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.patch('/:itemId', async (req, res) => {
    try {
        const item = null
        // 아이템 컬렉션에 추가
        const collection = null

        return res.status(200).send({ message: '성공' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.patch('/:itemId/review', async (req, res) => {
    try {
        const item = null
        // 아이템 리뷰 로직

        return res.status(200).send({ item })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = {
    itemRouter
}