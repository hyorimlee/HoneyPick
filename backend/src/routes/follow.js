const { Router } = require('express')
const followRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User } = require('../models')

followRouter.post('/', async (req, res) => {
    try {
        const user = null
        // 팔로우 로직

        return res.status(200).send({ message: '성공' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

followRouter.get('/:userId', async (req, res) => {
    try {
        const user = null
        // 팔로우, 팔로잉 목록 조회
        // 페이지네이션 필요할 듯
        const following = null
        const follower = null
        
        return res.status(200).send({ following, follower })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = {
    followRouter
}