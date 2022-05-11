const { Router } = require('express')
const followRouter = Router()
const { isValidObjectId, Types: { ObjectId } } = require('mongoose')
const { Follow, User } = require('../models')
const { authAccessToken } = require('./auth')

// 전체 페이지 수 (한 페이지에 6개)
function getTotalPages(length) {
  if (length % 6) {
    return (parseInt(length / 6) + 1)
  } else {
    return (length / 6)
  }
}

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

// 팔로워 목록 조회
followRouter.get('/:accountId/followers', authAccessToken, async (req, res) => {
  try {
    let { page=1 } = req.query
    page = parseInt(page)
    const { userId } = req
    const { accountId } = req.params
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (!isValidObjectId(ObjectId(accountId))) return res.status(401).send({ err: "invalid accountId" })

    // pagination: 최근 추가순. page는 1부터 시작. 6개씩 조회.
    const follow = await Follow.findOne({ "user._id": accountId })
    const [followers, totalPages] = await Promise.all([
      follow.followers
        .sort((a,b) => {
          if (a.updatedAt > b.updatedAt) {
            return -1
          } else if (a.updatedAt < b.updatedAt) {
            return 1
          }
          return 0
        })
        .slice((page-1)*6, page*6),
      getTotalPages(follow.followers.length)
    ])
    for (let i=0; i < followers.length; i++) {
      let user = await User.findById(followers[i]._id)
      let myFollowing = await Follow.findOne({ _id: user.follow, 'followers._id': userId})
      if (myFollowing) {
        followers[i].myFollow = true
      } else {
        followers[i].myFollow = false
      }
    }
    follow.update()
    return res.status(200).send({ totalPages, page, followers })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 팔로잉 목록 조회
followRouter.get('/:accountId/followings', authAccessToken, async (req, res) => {
  try {
    let { page=1 } = req.query
    page = parseInt(page)
    const { userId } = req
    const { accountId } = req.params
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (!isValidObjectId(ObjectId(accountId))) return res.status(401).send({ err: "invalid accountId" })

    // pagination: user의 updatedAt 내림차순(→ 랜덤으로 보임). page는 1부터 시작. 6개씩 조회.
    const follow = await Follow.findOne({ "user._id": accountId })
    const [followings, totalPages] = await Promise.all([
      follow.followings
        .sort((a,b) => {
          if (a.updatedAt > b.updatedAt) {
            return -1
          } else if (a.updatedAt < b.updatedAt) {
            return 1
          }
          return 0
        })
        .slice((page-1)*6, page*6),
      getTotalPages(follow.followings.length)
    ])
    for (let i=0; i < followings.length; i++) {
      let user = await User.findById(followings[i]._id)
      let myFollowing = await Follow.findOne({ _id: user.follow, 'followers._id': userId})
      if (myFollowing) {
        followings[i].myFollow = true
      } else {
        followings[i].myFollow = false
      }
    }
    follow.update()
    return res.status(200).send({ totalPages, page, followings })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = followRouter
