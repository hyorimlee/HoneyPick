const { Router } = require('express')
const voteRouter = Router()
const { isValidObjectId } = require('mongoose')
const { Vote, Collection, User } = require('../models')
const { authAccessToken } = require('./auth')

// 투표 생성
voteRouter.post('/', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    const { collectionId } = req.body
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(collectionId)) return res.status(400).send({ err: "invalid collectionId" })

    // 투표 만들기 & 프로필의 투표 목록에 추가
    const collection = await Collection.findById(collectionId)
    const vote = new Vote({ collectionId, result: collection.items})
    await Promise.all([
      vote.save(),
      User.updateOne({ _id: userId }, { $push: { votes: vote } })
    ])
    return res.status(201).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 목록 조회
voteRouter.get('/:accountId', authAccessToken, async (req, res) => {
  try {
    // 투표 목록: 페이지네이션. page 1부터 시작. 3개씩 보여줌
    let { page=1 } = req.query
    page = parseInt(page)
    const { accountId } = req.params
    const profileId = await User.find({ _id: accountId }).profile
    const votes = await User.find({ _id: accountId }).votes.sort({ updatedAt: -1 }).skip((page - 1) * 3).limit(3)
    return res.status(200).send({ votes })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 상세 조회
voteRouter.get('/:accountId/:voteId', authAccessToken, async (req, res) => {
  try {
    const { voteId } = req.params
    const vote = await Vote.findById(voteId)
    return res.status(200).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 종료 (종료 → 재시작 불가)
voteRouter.patch('/:accountId/:voteId', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    if (userId !== accountId) return res.status(401).send({ err: "Unauthorized" })

    const vote = await Vote.updateOne({ _id: voteId }, { $set: { isClosed: true } })
    return res.status(200).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표하기 로직 (투표 취소 불가)
voteRouter.patch('/:accountId/:voteId/:itemId', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    const { accountId, voteId, itemId } = req.params
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    if (!isValidObjectId(voteId)) return res.status(400).send({ err: "invalid voteId"})
    if (!isValidObjectId(itemId)) return res.status(400).send({ err: "invalid itemId"})

    const vote = await Vote.updateOne({ _id: voteId, 'result._id': itemId }, { $inc: { 'result.$.count': 1 } })
    return res.status(201).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = voteRouter
