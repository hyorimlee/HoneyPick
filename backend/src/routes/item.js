const { Router } = require('express')
const itemRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Item, Review, Collection } = require('../models')

const { authAccessToken } = require('./auth')

const axios = require('axios')

CRAWLING_SERVER_URL = process.env.CRAWLING_SERVER_URL

itemRouter.use('/:itemId/review', require('./review'))

itemRouter.post('/', authAccessToken, async (req, res) => {
    // 아이템 생성 로직
    try {
        const { url } = req.body
        if(typeof url !== 'string') return res.status(400).send({ err: "url is required" })
        
        var item = await Item.findOne({ url })

        // item이 존재하지않거나, 크롤링이 진행되지 않았을 경우
        // 크롤링이 진행되지 않았을 경우는 나중에 제거하거나 updatedAt을 통해 체크 후 크롤링 요청 필요로 변경
        if(!item || !item.title) {
            // mongodb에 데이터 생성
            if(!item){
                item = new Item({ ...req.body })
                await item.save()
            }
            // 크롤링 서버 요청 (Return 필요없음)
            test = false
            if(!test) {
                axios({
                    method: 'post',
                    url: `${CRAWLING_SERVER_URL}/item`,
                    data: {
                        url: url,
                        item_id: item._id,
                    }
                }).then(() => {
                    console.log('item crawl success')
                }).catch(({response}) => {
                    console.log(response.data.detail)
                })
            }
        }
        return res.status(201).send({ item })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.get('/:itemId', authAccessToken, async (req, res) => {
    try {
        const { itemId } = req.params
        const { userId } = req.query
        if(!isValidObjectId(itemId)) return res.status(400).send({ err: "invalid itemId" })
        if(!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" })

        const [item, review] = await Promise.all([
            Item.findById(itemId),
            Review.findOne({ user: userId, item: itemId })
        ])
        if(!item) res.status(400).send({ err: "item does not exist" })

        return res.status(200).send({ item, review })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

// 아이템 - 컬렉션 관리
// 아이템 컬렉션에서 삭제
// 아이템
itemRouter.patch('/:itemId', authAccessToken, async (req, res) => {
    try {
        const { itemId } = req.params
        if(!isValidObjectId(itemId)) return res.status(400).send({ err: "invalid itemId" })
        const { collectionId } = req.body
        if(!isValidObjectId(collectionId)) return res.status(400).send({ err: "invalid collectionId" })
        
        const item = await Item.findById(itemId)
        if(!item) return res.status(400).send({ err: "item does not exist" })

        await Collection.findByIdAndUpdate(collectionId, { $push: { items: [item] } })

        return res.status(200).send({ message: 'success' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = itemRouter
