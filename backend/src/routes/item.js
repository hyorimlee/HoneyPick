const { Router } = require('express')
const itemRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Item } = require('../models')

CRAWLING_SERVER_URL = process.env.CRAWLING_SERVER_URL

itemRouter.post('/', async (req, res) => {
    // 아이템 생성 로직
    try {
        const { url } = req.body
        
        if(typeof url !== 'string') return res.status(400).send({ err: "url is required" })

        let item = await Item.findOne({ url })
        if(!item) {
            // mongodb에 데이터 생성
            item = new Item({ ...req.body })
            await item.save()
            // 크롤링 서버 요청 (Return 필요없음)
            axios({
                method: 'post',
                url: `${CRAWLING_SERVER_URL}/item`,
                data: {
                    url: url,
                    _id: item._id,
                }
            })
        }
        return res.status(201).send({ item })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.get('/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params
        if(!isValidObjectId(itemId)) return res.status(400).send({ err: "invalid itemId" })
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