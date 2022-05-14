const { Router } = require('express')
const eventRouter = Router()
const { isValidObjectId } = require('mongoose')
const { User, Event, Follow, Item } = require('../models')
const { authAccessToken } = require('./auth')
const { Types: { ObjectId } } = require('mongoose')

// 팔로워인지 검증
async function isFollower(accountId, userId) {
  const account = await User.findById(accountId)
  const isFollow = await Follow.findOne({ _id: account.follow, 'followers._id': userId })
  if (isFollow) {
    return true
  }
  return false
}

// 컬렉션 생성
eventRouter.post('/', authAccessToken, async (req, res) => {
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
    console.log(user.events.length)

    // 기존 컬렉션이 30개 이상이면, 생성 차단
    if (user.events.length >= 30) return res.status(403).send({ err: "maximum 30 events per user" })

    // 컬렉션 자체 추가 & 회원의 컬렉션 목록에 추가
    const event = new Event({ ...req.body, user })
    await Promise.all([
      event.save(),
      User.updateOne({ _id: userId }, { $push: { events: event }})
    ])
    return res.status(201).send({ event })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 목록 조회
eventRouter.get('/:accountId', authAccessToken, async (req, res) => {
  try {
    const { accountId } = req.params
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    const account = await User.findById(accountId)

    // 비공개인 컬렉션은, 사용자가 팔로워여야만 조회 가능 (jwt)
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    // 팔로워 목록 조회해서, 팔로워면 all, 아니면 public 보여주기
    if (await isFollower(accountId, userId) === true || accountId == userId) {
      const allevents = await account.events.sort((a,b) => {
        if (a.updatedAt > b.updatedAt) {
          return -1
        } else if (a.updatedAt < b.updatedAt) {
          return 1
        }
        return 0
      })
      return res.status(200).send({ events: allevents })
    } else {
      const unsortedEvents = await account.events.filter(event => event['isPublic'] == true)
      const publicEvents = await unsortedEvents.sort((a,b) => {
        if (a.updatedAt > b.updatedAt) {
          return -1
        } else if (a.updatedAt < b.updatedAt) {
          return 1
        }
        return 0
      })
      return res.status(200).send({ events: publicEvents })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 상세 조회
eventRouter.get('/:accountId/:eventId', authAccessToken, async (req, res) => {
  try {
    const { accountId, eventId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId" })
    if (!isValidObjectId(eventId)) return res.status(400).send({ err: "invalid eventId" })

    // 비공개인 경우: jwt 토큰에서 userId 가져와서 accountId 의 팔로워 목록에 있는지 확인하고, 있으면 공개, 없으면 못 봄
    const event = await Event.findById(eventId)
    if (event.isPublic === false) {
      if (await isFollower(accountId, userId) == false && accountId !== userId) {
        return res.status(400).send({ err: 'private event'})
      }
    }
    var idList = event.items.map(({ _id }) => ObjectId(_id))
    var itemList = await Item.find({ _id: { $in: idList }})
    const items = itemList.map((item, idx) => {
      return { ...item._doc, recommend: event.items[idx].recommend }
    })

    return res.status(200).send({ event, items })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 수정(제목, 설명, 공개여부. 아이템 추가 및 제거는 item.js에서 처리)
eventRouter.patch('/:accountId/:eventId', authAccessToken, async (req, res) => {
  try {
    const { accountId, eventId } = req.params
    const { title, description, isPublic } = req.body
    const { userId } = req
    let event = await Event.findById(eventId)

    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (event.user._id.toString() !== userId || userId !== accountId) return res.status(401).send({ err: "Unauthorized" })
    if (title && typeof title !== 'string') return res.status(400).send({ err: "title must be a string" })
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be a string" })
    if (typeof isPublic !== 'undefined' && typeof isPublic !== 'boolean') return res.status(400).send({ err: "isPublic must be a boolean" })

    const eventUpdate = {}
    const userUpdate = {}
    
    if (title) {
      eventUpdate['title'] = title
      userUpdate['events.$.title'] = title
    }
    if (description) {
      eventUpdate['description'] = description
    }
    if (typeof isPublic !== 'undefined') {
      eventUpdate['isPublic'] = isPublic
    }

    [event, _] = await Promise.all([
      event.findByIdAndUpdate(eventId, eventUpdate, { new: true }),
      User.updateOne({ _id: userId, 'events._id': eventId }, userUpdate)
    ])

    return res.status(200).send({ event })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 삭제
eventRouter.delete('/:accountId/:eventId', authAccessToken, async (req, res) => {
  try {
    const { accountId, eventId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(accountId)) return res.status(400).send({ err: "invalid accountId"})
    if (userId !== accountId) return res.status(401).send({ err: "Unauthorized" })
    if (!isValidObjectId(eventId)) return res.status(400).send({ err: "invalid eventId"})

    await Promise.all([
      Event.findByIdAndDelete(eventId),
      User.findByIdAndUpdate(accountId, { $pull: { events: { _id: eventId }}})
    ])
    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = eventRouter
