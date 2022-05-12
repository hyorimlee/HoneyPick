const { Router } = require('express')
const recommendRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Item, Collection } = require('../models')

const { authAccessToken } = require('./auth')

recommendRouter.get('/', authAccessToken, async (req, res) => {
    try {
        // 추천 로직 구상 (sort 등)
        collectionTitles = [
            '팔로우중인 user1의',
            '팔로우중인 user2의',
            '팔로우중인 user3의',
            '팔로우중인 user4의',
            '팔로우중인 user5의',
        ]

        itemTitles = [
            '최근 등록된 아이템',
            'sticker1이 많은 아이템',
            'sticker2가 많은 아이템',
            'sticker3이 많은 아이템',
            'sticker4가 많은 아이템'
        ]

        const result = await Promise.all([
            Collection.find({}).sort({ updatedAt: -1 }).limit(5),
            Item.find({}).sort({ updatedAt: -1 }).limit(8),
            Item.find({}).sort({ 'stickers.2': -1 }).limit(8),
            Item.find({}).sort({ 'stickers.3': -1 }).limit(8),
            Item.find({}).sort({ 'stickers.4': -1 }).limit(8),
            Item.find({}).sort({ 'stickers.5': -1 }).limit(8),
        ])
        const collections = result.shift().map((collection, idx)=>{
            return {
                title: collectionTitles[idx],
                collection
            }
        })

        const items = result.map((item, idx) => {
            return {
                title: itemTitles[idx],
                itemList: item
            }
        })
        
        
        return res.status(200).send({ collections, items })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = recommendRouter