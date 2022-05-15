const { Router } = require('express')
const eventRouter = Router()
const { isValidObjectId } = require('mongoose')
const { User, Event, Follow, Item } = require('../models')
const { authAccessToken } = require('./auth')
const { Types: { ObjectId } } = require('mongoose')

// event 생성
eventRouter.post('/', authAccessToken, async (req, res) => {
  try {
    // jwt 검증: user 추출 및 검증
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    const user = await User.findById(userId)

    //USER가 ADMIN 권한을 가졌는지 확인
    if(user.isAdmin == false) return res.status(401).send({err:'user is not admin'})
    // title, description, isPublic 추출 및 검증
    const { title, description, additional} = req.body
    if (typeof title !== 'string') return res.status(400).send({ err: "string title is required"})
    if (additional && typeof additional !== 'string') return res.status(400).send({ err: "additional must be string type"})
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be string type"})
    // console.log(user.events.length)

    // // 기존 컬렉션이 30개 이상이면, 생성 차단
    // if (user.events.length >= 30) return res.status(403).send({ err: "maximum 30 events per user" })

    // event 자체 추가 
    const event = new Event({ ...req.body, user })
    await event.save()
    return res.status(201).send({ event })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// event 목록 조회
// eventRouter.get('/', authAccessToken, async (req, res) => {
eventRouter.get('/', async (req, res) => {
  try {
    const events = await Event.find({})
    return res.status(200).send({ events: events })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 이벤트 상세 조회
eventRouter.get('/:eventId', authAccessToken, async (req, res) => {
  try {
    const { eventId } = req.params
    if (!isValidObjectId(eventId)) return res.status(400).send({ err: "invalid eventId" })
    if(event.isDeleted==true) return res.status(401).send({err:"event is already deleted"})
    const event = await Event.findById(eventId)

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

// 이벤트 수정
eventRouter.patch('/:eventId', authAccessToken, async (req, res) => {
  try {
    const { eventId } = req.params
    const { title, description, additional} = req.body
    const { userId } = req
    let event = await Event.findById(eventId)

    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (event.user._id.toString() !== userId ) return res.status(401).send({ err: "Unauthorized" })
    if(event.isDeleted==true) return res.status(401).send({err:"event is already deleted"})
    if (title && typeof title !== 'string') return res.status(400).send({ err: "title must be a string" })
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be a string" })
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be a string" })
    const eventUpdate = {}
    const userUpdate = {}
    if(title) event.title = title
    if(description) event.description = description
    if(additional) event.additional = additional

    await event.save()
    return res.status(200).send({ event })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 컬렉션 삭제
eventRouter.delete('/:eventId', authAccessToken, async (req, res) => {
  try {
    const {  eventId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(eventId)) return res.status(400).send({ err: "invalid eventId"})

    let event = await Event.findById(eventId)
    if (userId !==event.user._id.toString()) return res.status(401).send({ err: "Unauthorized" })
    if(event.isDeleted==true) return res.status(401).send({err:"event is already deleted"})
    event.isDeleted = true

    await event.save()
    console.log(event.title)
    return res.status(200).send({msg:`${event.title} is deleted`})
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

module.exports = eventRouter
