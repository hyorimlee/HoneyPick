const { Router } = require('express')
const collectionRouter = Router()
const { isValidObjectId } = require('mongoose')
const { User, Collection, Item, Follow } = require('../models')
const { authAccessToken } = require('./auth')

// 팔로워인지 검증
async function isFollower(accountId, userId) {
  const followId = await User.findById(accountId).followId
  let followers = await Follow.findById(followId).followers
  if (!followers) {
    followers = []
  }
  if (followers.includes(userId)) {
    return true
  }
  return false
}

// 컬렉션 생성
collectionRouter.post('/', authAccessToken, async (req, res) => {
  try {
    // jwt 검증: user 추출 및 검증
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    const user = await User.findById(userId)

    // title, description, isPublic 추출 및 검증
    const { title, description, isPublic } = req.body
    if (typeof title !== 'string') return res.status(400).send({ err: "string title is required"});
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be string type"});
    if (typeof isPublic !== 'boolean') return res.status(400).send({ err: "boolean isPublic is required"});

    // 컬렉션 자체 추가 & 프로필의 컬렉션 목록에 추가
    const collection = new Collection({ ...req.body, user })
    await Promise.all([
      collection.save(),
      User.updateOne({ _id: userId }, { $push: { collections: collection }})
    ])
    return res.status(201).send({ collection })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 목록 조회
collectionRouter.get('/:accountId', authAccessToken, async (req, res) => {
  try {
    let { page=1 } = req.query
    page = parseInt(page)
    const { accountId } = req.params
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})

    // 비공개인 컬렉션은, 사용자가 팔로워여야만 조회 가능 (jwt)
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    // 팔로워 목록 조회해서, 팔로워면 all, 아니면 public 보여주기
    // 컬렉션 목록 조회 w/ pagination. 최신 업데이트 순. page는 1부터 시작. 3개씩 조회.
    if (await isFollower(accountId, userId) === true) {
      const allCollections = await Collection.find({ "user._id": accountId }).sort({ updatedAt: -1 }).skip((page - 1) * 3).limit(3)
      return res.status(200).send({ collections: allCollections })
    } else {
      const publicCollections = await Collection.find({ "user._id": accountId, isPublic: true }).sort({ updatedAt: -1 }).skip((page - 1) * 3).limit(3)
      return res.status(200).send({ collections: publicCollections })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 상세 조회
collectionRouter.get('/:accountId/:collectionId', authAccessToken, async (req, res) => {
  try {
    const { accountId, collectionId } = req.params
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId" })
    if (!isValidObjectId(collectionId)) return res.status(400).send({ err: "invalid collectionId" })

    // 비공개인 경우: jwt 토큰에서 userId 가져와서 accountId 의 팔로워 목록에 있는지 확인하고, 있으면 공개, 없으면 못 봄
    const collection = await Collection.findById(collectionId)
    if (collection.isPublic === false) {
      const { userId } = req
      if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
      if (await isFollower(accountId, userId) == false) {
        return res.status(400).send({ err: 'private collection'})
      }
    }
    return res.status(200).send({ collection })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 수정(제목, 설명, 공개여부. 아이템 추가 및 제거는 item.js에서 처리)
collectionRouter.patch('/:accountId/:collectionId', authAccessToken, async (req, res) => {
  try {
    const { accountId, collectionId } = req.params
    const { title, description, isPublic } = req.body
    const { userId } = req
    let collection = await Collection.findById(collectionId)

    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (collection.user._id.toString() !== userId || userId !== accountId) return res.status(401).send({ err: "Unauthorized" })
    if (title && typeof title !== 'string') return res.status(400).send({ err: "title must be a string" })
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be a string" })
    if (typeof isPublic !== 'undefined' && typeof isPublic !== 'boolean') return res.status(400).send({ err: "isPublic must be a boolean" })

    const promises = []
    if (title) promises.push(Collection.updateOne({ _id: collectionId }, { title }))
    if (description) promises.push(Collection.updateOne({ _id: collectionId }, { description }))
    if (typeof isPublic !== 'undefined') promises.push(Collection.updateOne({ _id: collectionId }, { isPublic }))
    await Promise.all(promises)
    collection = await Collection.findById(collectionId)
    return res.status(200).send({ collection })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 삭제
collectionRouter.delete('/:accountId/:collectionId', authAccessToken, async (req, res) => {
  try {
    const { accountId, collectionId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    if (userId !== accountId) return res.status(401).send({ err: "Unauthorized" })
    if (!isValidObjectId(collectionId)) return res.status(400).send({ err: "invalid collectionId"})

    // 컬렉션 자체 삭제 & user의 컬렉션 목록에서 삭제
    const collection = await Collection.findById(collectionId)
    console.log(1, collection)
    await Promise.all([
      Collection.deleteOne({ _id: collectionId }),
      User.updateOne({ _id: accountId }, { $pull: { collections: { _id: collectionId }}})
    ])
    console.log(2, collection)
    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = collectionRouter
