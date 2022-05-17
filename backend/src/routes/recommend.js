const { Router } = require('express')
const recommendRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Item, Collection, User, Follow } = require('../models')

const { authAccessToken } = require('./auth')

recommendRouter.get('/collection', authAccessToken, async (req, res) => {
    try {
        let { page=1 } = req.query
        page = parseInt(page)

        const userId = req.userId
        const user = await User.findById(userId)
        const followId = user.follow
        const follow = await Follow.findById(followId)
        const collectionTitles = follow.followings.map(({ nickname }) => `팔로우중인 ${nickname}의`).slice((page-1)*5, page*5)
        const followUserIds = follow.followings.map(({ _id }) => _id).slice((page-1)*5, page*5)

        const collections = await Collection.find({'user._id': {$in : followUserIds }})

        const result = collectionTitles.map((title, idx) => {
            return {
                title,
                collection: collections[idx]
            }
        })
        
        return res.status(200).send({ collections: result })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

recommendRouter.get('/item', authAccessToken, async (req, res) => {
    try {
        let { page=1, recs='0,1,2,3,4' } = req.query
        page = parseInt(page)

        recs = recs.split(',').map((item) => parseInt(item))

        // Recommend Schema
        recommends = [
            {
                title: '최근 등록된 아이템',
                sort: { updatedAt: -1 }
            },
            {
                title: '스티커 1이 많은 아이템',
                sort: { 'stickers.1': -1 }
            },
            {
                title: '스티커 2가 많은 아이템',
                sort: { 'stickers.2': -1 }
            },
            {
                title: '스티커 3이 많은 아이템',
                sort: { 'stickers.3': -1 }
            },
            {
                title: '스티커 4가 많은 아이템',
                sort: { 'stickers.4': -1 }
            },
        ].filter(({ }, idx) => recs.includes(idx))

        const promises = recommends.map(({ sort }) => Item.find({}).sort(sort).skip((page-1)*8).limit(8))
        const result = await Promise.all(promises)
        const items = result.map((item, idx) => {
            return {
                // rec로 배열에 추가가 가능했으면 좋겠네
                rec: recs[idx],
                title: recommends[idx].title,
                itemList: item,
                page
            }
        })
        
        return res.status(200).send({ items })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = recommendRouter