const { Router } = require('express')
const collectionRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User, Collection, Profile, Item } = require('../models')

// 컬렉션 생성
collectionRouter.post('/', async (req, res) => {
  try {
    // jwt 검증: user 추출 및 검증
    // if (!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" })
    // const user = await User.findById(userId)

    // test용
    const userId = '626b429de890c6b5665a1c4e'
    const user = await User.findById(userId)
    //

    // title, description, isPublic 추출 및 검증
    const { title, description, isPublic } = req.body
    if (typeof title !== 'string') return res.status(400).send({ err: "string title is required"});
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be string type"});
    if (typeof isPublic !== 'boolean') return res.status(400).send({ err: "boolean isPublic is required"});

    // 컬렉션 자체 추가 & 프로필의 컬렉션 목록에 추가
    const collection = new Collection({ ...req.body, user })
    const profileId = await User.findById(userId).profile
    await Promise.all([
      collection.save(),
      Profile.updateOne({ _id: profileId }, { $push: { collections: collection }})
    ])
    return res.status(201).send({ collection })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 목록 조회
collectionRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    let { page=1 } = req.query
    page = parseInt(page)
    if (!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId"})
    const user = await User.findById(userId)
    // 컬렉션 목록 조회 w/ pagination. 최신 업데이트 순. page는 1부터 시작. 3개씩 조회.
    const collections = await Collection.find({ user: userId }).sort({ updatedAt: -1 }).skip((page - 1) * 3).limit(3)
    return res.status(200).send({ collections })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 상세 조회
collectionRouter.get('/:userId/:collectionId', async (req, res) => {
  try {
    const { collectionId } = req.params
    const collection = await Collection.findById(collectionId)
    return res.status(200).send({ collection })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 수정(제목, 설명, 아이템, 공개여부)
collectionRouter.patch('/:userId/:collectionId', async (req, res) => {
  try {
    const { collectionId } = req.params
    const { title, description, itemId, isPublic } = req.body

    if (title && typeof title !== 'string') return res.status(400).send({ err: "title must be a string" })
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be a string" })
    if (typeof isPublic !== 'undefined' && typeof isPublic !== 'boolean') return res.status(400).send({ err: "isPublic must be a boolean" })
    if (itemId && !isValidObjectId(itemId)) return res.status(400).send({ err: "invalid itemId"} )

    const promises = []
    if (title) promises.push(Collection.updateOne({ _id: collectionId }, { title }, { new: true }))
    if (description) promises.push(Collection.updateOne({ _id: collectionId }, { description }, { new: true }))
    if (typeof isPublic !== 'undefined') promises.push(Collection.updateOne({ _id: collectionId }, { isPublic }, { new: true }))
    if (itemId) {
      const item = await Item.findById(itemId)
      if (collection.items.findById(itemId)) {
        promises.push(Collection.updateOne({ _id: collectionId }, { $pull: { items: item } }, { new: true }))
      } else {
        promises.push(Collection.updateOne({ _id: collectionId }, { $push: { items: item } }, { new: true }))
      }
    }
    await Promise.all(promises)
    const collection = await Collection.findById(collectionId)
    return res.status(200).send({ collection })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 삭제
collectionRouter.delete('/:userId/:collectionId', async (req, res) => {
  try {
    const { userId, collectionId } = req.params
    if (!isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId"})
    if (!isValidObjectId(collectionId)) return res.status(400).send({ err: "invalid collectionId"})

    const profileId = await User.findById(userId).profile
    // 컬렉션 자체 삭제
    const collection = await Collection.findByIdAndDelete(collectionId)
    // 프로필의 컬렉션 목록에서 삭제
    Profile.updateOne({ _id: profileId }, { $pull: { collections: collection }})
    return res.status(204).send({ collection })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = collectionRouter
