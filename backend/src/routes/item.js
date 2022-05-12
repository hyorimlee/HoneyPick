const { Router } = require('express')
const itemRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId, Types: { ObjectId } } = require('mongoose')
const { Item, Review, Collection } = require('../models')

const { v4: uuid } = require("uuid")
const mime = require("mime-types")

const { authAccessToken } = require('./auth')
const { getSignedUrl } = require('../aws')

const axios = require('axios')

CRAWLING_SERVER_URL = process.env.CRAWLING_SERVER_URL

itemRouter.use('/:itemId/review', require('./review'))

itemRouter.post('/', authAccessToken, async (req, res) => {
    try {
        const { url } = req.body
        if(typeof url !== 'string') return res.status(400).send({ err: "url is required" })
        
        var item = await Item.findOne({ url })

        var needCrawl = false
        
        if(!item) {
            item = new Item({ ...req.body })
            await item.save()
            needCrawl = true
        }

        if(item.updatedAt) {
            const nowDate = new Date()
            const crawlDate = new Date(item.updatedAt)
            const hourDiff = (nowDate.getTime() - crawlDate.getTime()) / (1000*60*60)
            if(hourDiff > 24) needCrawl = true
        }

        if(needCrawl) {
            axios({
                method: 'post',
                url: `${CRAWLING_SERVER_URL}/item`,
                headers: { user_id: req.userId },
                data: {
                    url: url,
                    item_id: item._id,
                }
            }).then(() => {
                console.log('item crawl success')
            }).catch(({response}) => {
                console.log(response)
            })
        }

        return res.status(201).send({ _id: item._id })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.get('/:itemId', authAccessToken, async (req, res) => {
    try {
        const { itemId } = req.params
        var { userId } = req.query
        
        // query에 userId가 없을 경우 본인의 리뷰 가져오기
        if(!userId) userId = req.userId
        
        if(!isValidObjectId(itemId)) return res.status(400).send({ err: "잘못된 itemId" })
        if(!isValidObjectId(userId)) return res.status(400).send({ err: "잘못된 userId" })

        const [item, review] = await Promise.all([
            Item.findById(itemId),
            Review.findOne({ user: userId, item: itemId })
        ])
        if(!item) res.status(400).send({ err: "아이템이 존재하지 않습니다." })
        item.stickers = Object.entries(item.stickers).sort(([, a], [, b]) => b - a).slice(0, 3)
        return res.status(200).send({ item, review })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.patch('/:itemId', authAccessToken, async (req, res) => {
    try {
        const { itemId } = req.params
        if(!isValidObjectId(itemId)) return res.status(400).send({ err: "잘못된 itemId" })
        const item = await Item.findById(itemId)
        if(!item) return res.status(400).send({ err: "아이템이 존재하지 않습니다." })
        
        const userId = req.userId

        const { originalCollectionId, collectionId } = req.body

        var promises = []
        if(originalCollectionId) {
            if(!isValidObjectId(originalCollectionId)) return res.status(400).send({ err: "잘못된 originalCollectionId" })
            // collection 주인 여부 체크
            // findbyid후에 callback으로 처리
            // Collection.findById(originalCollectionId, (err, doc) => {
            //     if(doc.user._id == userId){
            //         doc.$pull()
            //     }
            // })
            promises.push(Collection.findByIdAndUpdate(originalCollectionId, { $pull: { items: { _id: ObjectId(itemId) } } }))
        }
        if(collectionId) {
            if(!isValidObjectId(collectionId)) return res.status(400).send({ err: "잘못된 collectionId" })
            const review = await Review.findOne({ user: userId, item: itemId })
            const recommend = review?.isRecommend
            promises.push(Collection.findByIdAndUpdate(collectionId, { $push: { items: { _id: ObjectId(itemId), recommend } } }))
        }

        await Promise.all(promises)

        return res.status(200).send({ message: 'success' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

itemRouter.post('/:itemId/presigned', async(req, res) => {
    try {
        const { itemId } = req.params
        if(!isValidObjectId(itemId)) return res.status(400).send({ err: "잘못된 itemId" })

        const { contentType } = req.body
        
        const imageKey = `${uuid()}.${mime.extension(contentType) ? mime.extension(contentType) : 'jpg'}`
        const key = `raw/${imageKey}`
        const presigned = await getSignedUrl({ key })

        await Item.findByIdAndUpdate(itemId, { $set: { thumbnail: imageKey } })

        return res.status(200).send({ imageKey, presigned })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = itemRouter
