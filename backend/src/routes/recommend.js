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
        const [myFollow, influencers] = await Promise.all([
            Follow.findById(followId),
            User.find({}).sort({ followerCount: -1 }).limit(5)
        ])


        const collectionTitles = myFollow.followings.map(({ nickname }) => `팔로우중인 ${nickname}의`).slice((page-1)*5, page*5)
        const followUserIds = myFollow.followings.map(({ _id }) => _id).slice((page-1)*5, page*5)

        const [likedCollection, followCollections] = await Promise.all([
            Collection.find({ liked: { $gt: 0 } }).sort({ liked: -1 }).limit(5),
            Collection.find({'user._id': {$in : followUserIds }})
        ])

        const collections = collectionTitles.map((title, idx) => {
            return {
                title,
                collection: followCollections[idx]
            }
        })

        // 많은 사람들의 찜에 담긴 컬렉션
        collections.push(...likedCollection.map(collection => {
            return {
                title: `${collection.liked}명의 사람들의 찜에 담긴 컬렉션`,
                collection
            }
        }))

        // 팔로워 수가 많은 유저의 랜덤 컬렉션
        const influencerCollection = influencers.map(({ _id, followerCount, nickname, collections }) => {
            if(collections.length) {
                targetCollection = collections[Math.floor(Math.random() * collections.length)]
                return {
                    title: `${followerCount}명이 팔로우중인 ${nickname}의`,
                    collection: {
                        ...targetCollection._doc,
                        user: {
                            _id
                        }
                    }
                }
            }
            return false
        })

        collections.push(...influencerCollection.filter(item => item))

        var uniqueCollections = []
        var uniqueCollectionIds = []
        collections.forEach(({ title, collection }) => {
            stringId = collection._id.toString()
            if(uniqueCollectionIds.indexOf(stringId) > -1){

            } else {
                uniqueCollectionIds.push(stringId)
                uniqueCollections.push({
                    title, collection
                })
            }
        })

        return res.status(200).send({ collections: uniqueCollections })
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