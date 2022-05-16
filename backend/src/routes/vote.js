const { Router } = require('express')
const voteRouter = Router()
const { isValidObjectId, Types: { ObjectId } } = require('mongoose')
const { Vote, Collection, User, Follow } = require('../models')
const { authAccessToken } = require('./auth')

// 팔로워인지 검증
async function isFollower(accountId, userId) {
  const account = await User.findById(accountId)
  const isFollow = await Follow.findOne({ _id: account.follow, 'followers._id': userId })
  if (isFollow) {
    return true
  }
  return false
}

// 투표 생성
voteRouter.post('/', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    const { collectionId, title, isPublic } = req.body
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(collectionId)) return res.status(400).send({ err: "invalid collectionId" })
    if (title && typeof title !== 'string') return res.status(400).send({ err: "title must be a string" })
    if (typeof isPublic !== 'undefined' && typeof isPublic !== 'boolean') return res.status(400).send({ err: "isPublic must be a boolean" })

    // 투표 만들기 & 프로필의 투표 목록에 추가
    const collection = await Collection.findById(collectionId)
    const accountId = collection.user._id
    if (accountId.toString() !== userId) return res.status(403).send({ err: "Unauthorized" })
    const vote = new Vote({ collectionId, title, result: collection.items, isPublic })
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
    const { accountId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId" })
    const account = await User.findById(accountId)

    // 팔로워 혹은 본인이면 모든 투표 조회, 아니라면 public 투표만 조회
    if (await isFollower(accountId, userId) === true || accountId == userId ) {
      const allVotes = await account.votes.sort((a,b) => {
        if (a. createdAt > b. createdAt) {
          return -1
        } else if (a. createdAt < b. createdAt) {
          return 1
        }
        return 0
      })
      return res.status(200).send({ votes: allVotes })
    } else {
      const unsortedVotes = await account.votes.filter(vote => vote['isPublic'] == true)
      const publicVotes = await unsortedVotes.sort((a,b) => {
        if (a.createdAt > b.createdAt) {
          return -1
        } else if (a.createdAt < b.createdAt) {
          return 1
        }
        return 0
      })
      return res.status(200).send({ votes: publicVotes })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 상세 조회
voteRouter.get('/:accountId/:voteId', authAccessToken, async (req, res) => {
  try {
    const { accountId, voteId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId" })
    if (!isValidObjectId(voteId)) return res.status(400).send({ err: "invalid voteId"})

    const vote = await Vote.findById(voteId)
    if (vote.isPublic === false) {
      if (await isFollower(accountId, userId) == false && accountId !== userId) {
        return res.status(400).send({ err: "private vote"})
      }
    }
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
    if (userId !== accountId) return res.status(403).send({ err: "Unauthorized" })
    await Promise.all([
      Vote.updateOne({ _id: voteId }, { $set: { isClosed: true } }),
      User.updateOne({ _id: userId, 'votes._id': voteId }, { 'votes.$.isClosed': true })
    ])
    const vote = await Vote.findById(voteId)
    return res.status(200).send({ vote })
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
    if (userId !== accountId) return res.status(403).send({ err: "Unauthorized" })

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
    await Vote.updateOne({ _id: voteId, 'result._id': ObjectId(itemId) }, { $inc: { 'result.$.count': 1 }, $push: { participants: user } })
    return res.status(201).send({ message: "success" })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = voteRouter
