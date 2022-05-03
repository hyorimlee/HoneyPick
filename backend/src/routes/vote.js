const { Router } = require('express')
const voteRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Vote, Collection, VoteSchema, User, Profile } = require('../models')
const { authAccessToken } = require('./auth')

// 투표 생성
voteRouter.post('/', async (req, res) => {
  try {
    // jwt 검증: user 추출 및 검증
    const userId = await authAccessToken(req, res)
    if (!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" })
    const user = await User.findById(userId)

    // 투표 만들기 & 프로필의 투표 목록에 추가
    const { collection } = req.body
    if (!isValidObjectId(collection)) return res.status(400).send({ err: "invalid collectionId" })
    const result = await Collection.findById(collection).items
    const [vote, profileId] = await Promise.all([
      new Vote({ collectionId: collection, result }),
      User.findById(userId).profile
    ])
    await Promise.all([
      vote.save(),
      Profile.updateOne({ _id: profileId }, { $push: { votes: vote } })
    ])
    return res.status(201).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 목록 조회
voteRouter.get('/:userId', async (req, res) => {
  try {
    const user = null
    // 페이지네이션 필요할 듯
    const vote = Array(1)

    return res.status(200).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 상세 조회
voteRouter.get('/:userId/:voteId', async (req, res) => {
  try {
    const vote = null


    return res.status(200).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표 종료 (종료 → 재시작 불가)
voteRouter.patch('/:userId/:voteId', async (req, res) => {
  try {
    const vote = null


    return res.status(200).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 투표하기 로직
voteRouter.patch('/:userId/:voteId/:itemId', async (req, res) => {
  try {
    const vote = null
    const item = null


    return res.status(200).send({ vote })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = voteRouter
