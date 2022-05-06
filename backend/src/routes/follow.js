const { Router } = require('express')
const followRouter = Router()
const { isValidObjectId, Types: { ObjectId } } = require('mongoose')
const { Follow, User } = require('../models')
const { authAccessToken } = require('./auth')

// 팔로우 또는 팔로우 취소
followRouter.post('/', authAccessToken, async (req, res) => {
    try {
    const { userId } = req
    const { accountId } = req.body
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (!isValidObjectId(accountId)) return res.status(401).send({ err: "invalid accountId" })
    if (userId == accountId) return res.status(401).send({ err: "self-following is not allowed" })
    let [user, account, isFollowing] = await Promise.all([
      User.findById(userId),
      User.findById(accountId),
      Follow.findOne({ "user._id": userId, followings: { $elemMatch: { _id: ObjectId(accountId)}}})
    ])

    if (isFollowing) {
      await Promise.all([
        Follow.updateOne({ "user._id": userId }, { $pull: { followings: { _id: ObjectId(accountId) } }}),
        Follow.updateOne({ "user._id": accountId }, { $pull: { followers: { _id: ObjectId(userId) } }}),
        User.updateOne({ _id: userId }, { $inc: { followingCount: -1 }}),
        User.updateOne({ _id: accountId }, { $inc: { followerCount: -1 }})
      ])
      return res.status(201).send({ message: '팔로우 취소' })
    } else {
      await Promise.all([
        Follow.updateOne({ "user._id": userId }, { $push: { followings: account }}),
        Follow.updateOne({ "user._id": accountId }, { $push: { followers: user }}),
        User.updateOne({ _id: userId }, { $inc: { followingCount: 1 }}),
        User.updateOne({ _id: accountId }, { $inc: { followerCount: 1 }})
      ])
      return res.status(201).send({ message: '팔로우 시작' })
    }
    } catch (error) {
      console.log(error)
      return res.status(500).send({ err: error.message })
    }
})

// 팔로우, 팔로잉 목록 조회
followRouter.get('/:accountId', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    const { accountId } = req.params
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (!isValidObjectId(ObjectId(accountId))) return res.status(401).send({ err: "invalid accountId" })

    const follow = await Follow.findOne({ "user._id": accountId })

    let { page=1 } = req.query
    page = parseInt(page)

    // pagination: 최근 추가순. page는 1부터 시작. 6개씩 조회.
    const [followings, followers] = await Promise.all([
      Follow.findOne({ "user._id": accountId }).sort( { "followings.updatedAt": -1 }).skip((page - 1) * 6).limit(6).select('followings'),
      Follow.findOne({ "user._id": accountId }).sort({ "followers.updatedAt": -1 }).skip((page - 1) * 6).limit(6).select('followers')
    ])
    return res.status(200).send({ followings: followings.followings, followers: followers.followers })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = followRouter
