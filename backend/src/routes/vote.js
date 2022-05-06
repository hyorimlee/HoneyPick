const { Router } = require('express')
const voteRouter = Router()
const { isValidObjectId, Types: { ObjectId } } = require('mongoose')
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
    const vote = new Vote({ collectionId, result: collection.items })
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

// 투표 목록 조회 (투표는 전체공개)
voteRouter.get('/:accountId', authAccessToken, async (req, res) => {
  try {
    // 투표 목록: 페이지네이션. page 1부터 시작. 3개씩 보여줌
    let { page=1 } = req.query
    page = parseInt(page)
    const { accountId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId" })

    const account = await User.findById(accountId)
    const votes =
      await account.votes
        .sort((a,b) => {
          if (a.updatedAt > b.updatedAt) {
            return -1
          } else if (a.updatedAt < b.updatedAt) {
            return 1
          }
          return 0
        })
        .slice((page-1)*3, page*3)
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
    if (!isValidObjectId(voteId)) return res.status(400).send({ err: "invalid voteId"})
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
    const { accountId, voteId } = req.params
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    if (!isValidObjectId(voteId)) return res.status(400).send({ err: "invalid voteId"})
    if (userId !== accountId) return res.status(401).send({ err: "Unauthorized" })
    await Promise.all([
      Vote.updateOne({ _id: voteId }, { $set: { isClosed: true } }),
      User.updateOne({ _id: userId, 'votes._id': voteId }, { 'votes.$.isClosed': true })
    ])
    return res.status(200).send({ message: "poll is now closed" })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 삭제
voteRouter.delete('/:accountId/:voteId', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    const { accountId, voteId } = req.params
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    if (!isValidObjectId(voteId)) return res.status(400).send({ err: "invalid voteId"})
    if (userId !== accountId) return res.status(401).send({ err: "Unauthorized" })

    await Promise.all([
      Vote.deleteOne({ _id: voteId }),
      User.updateOne({ _id: accountId }, { $pull: { votes: { _id: ObjectId(voteId) } }})
    ])
    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표하기 로직 (투표 취소 불가, 1인 1표)
voteRouter.patch('/:accountId/:voteId/:itemId', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    const { accountId, voteId, itemId } = req.params
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    if (!isValidObjectId(voteId)) return res.status(400).send({ err: "invalid voteId"})
    if (!isValidObjectId(itemId)) return res.status(400).send({ err: "invalid itemId"})

    const [vote, user, participated] = await Promise.all([
      Vote.findById(voteId),
      User.findById(userId),
      Vote.findOne({ 'participants._id': userId })
    ])
    if (participated) return res.status(403).send({ err: "voting is allowed only once"})
    if (vote.isClosed == true) return res.status(403).send({ err: "closed poll"})
    await Promise.all([
      Vote.updateOne({ _id: voteId, 'result._id': ObjectId(itemId) }, { $inc: { 'result.$.count': 1 }, $push: { participants: user } })
    ])
    return res.status(201).send({ message: "success" })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = voteRouter
