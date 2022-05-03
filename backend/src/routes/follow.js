const { Router } = require('express')
const followRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User, Follow } = require('../models')
const { authAccessToken } = require('./auth')

// 팔로우 또는 팔로우 취소
followRouter.post('/', async (req, res) => {
    try {
    // jwt 검증: user 추출 및 검증
    const userId = await authAccessToken(req, res)
    // if (!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" })
    const followings = await Follow.findOne({ user: userId })
    console.log(followings)
    // 팔로워 목록에 없으면: push, 있으면: pull.
    const { accountId } = req.body
    if (followings.includes(accountId)) {
      Follow.updateOne({ user: userId}, { $pull: { followings: accountId }})
      return res.status(204).send({ message: '팔로우 취소' })
    } else {
      Follow.updateOne({ user: userId}, { $push: { followings: accountId }})
      return res.status(201).send({ message: '팔로우 시작' })
    }
    } catch (error) {
      console.log(error)
      return res.status(500).send({ err: error.message })
    }
})

// 팔로우, 팔로잉 목록 조회
followRouter.get('/:userId', async (req, res) => {
    try {
        const user = null

        // 페이지네이션 필요할 듯
        const following = null
        const follower = null

        return res.status(200).send({ following, follower })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = followRouter
