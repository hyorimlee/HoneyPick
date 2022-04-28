const { Router } = require('express')
const collectionRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User, Collection, Profile } = require('../models')

collectionRouter.post('/', async (req, res) => {
    try {
        // jwt 검증: user 추출 및 검증
        // const user = await User.findById(userId)

        // title, description, isPublic 추출 및 검증
        const { title, description, isPublic } = req.body
        if (typeof title !== 'string') return res.status(400).send({ err: "string title is required"});
        if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be string type"});
        if (typeof isPublic !== 'boolean') return res.status(400).send({ err: "boolean isPublic is required"});
        
        // 컬렉션 자체 추가
        const collection = new Collection({ ...req.body, user })
        await collection.save()
        // 프로필의 컬렉션 목록에 추가
        // const blog = Profile.

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