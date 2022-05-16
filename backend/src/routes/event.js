const { Router } = require('express')
const eventRouter = Router()
const { isValidObjectId } = require('mongoose')
const { User, Event, Review,Item } = require('../models')
const { authAccessToken } = require('./auth')
const { Types: { ObjectId } } = require('mongoose')


eventRouter.patch('/item',authAccessToken,async(req,res)=>{
  try {
        const userId = req.userId
        const user = await findById(userId)
        if(user.isAdmin == false) return res.status(400).send({err:"user가 admin이 아닙니다"})
        const { originalEventId, eventId,itemId } = req.body
        if(!eventId && !originalEventId) return res.status(400).send({err:"eventId 혹은 originalEventId가 필요"})
        
        if(!isValidObjectId(itemId)) return res.status(400).send({ err: "잘못된 itemId" })
        if(originalEventId&&!isValidObjectId(originalEventId)) return res.status(400).send({ err: "잘못된 originalEventId" })
        if(eventId && !isValidObjectId(eventId)) return res.status(400).send({ err: "잘못된 eventId" })

        const item = await Item.findById(itemId)
        if(!item) return res.status(400).send({ err: "아이템이 존재하지 않습니다." })

        var promises = []
        if(originalEventId) {            
            promises.push(Event.findOneAndUpdate({ _id: originalEventId, 'user._id': userId }, { $pull: { items: { _id: itemId } } }, { new: true }))
        }
        if(eventId) {
            const review = await Review.findOne({ user: userId, item: itemId })
            const recommend = review?.isRecommend
            promises.push(Event.findOneAndUpdate({_id: eventId, 'user._id': userId}, { $addToSet: { items: { _id: itemId, recommend } } }))
        }

        await Promise.all(promises)
        // return res.status(204).send()
        return res.status(200).send({ message: `add [${item.title}] at [${eventId}]`})
  } catch (err) {
    console.log(err)
    return res.status(500).send({err:err.message})
  }
})


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
    const { title, description, additional} = req.bodyrh
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
eventRouter.get('/', authAccessToken, async (req, res) => {
  try {
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })

    const user = await User.findById(userId)
    if(user.withdraw == true) return res.status(401).send({err:"withdrawn user"})

    const events = await Event.find({})
    return res.status(200).send({ events: events })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})

// 이벤트 개별 조회
eventRouter.get('/:eventId', authAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if(user.withdraw == true) return res.status(401).send({err:"withdrawn user"})

    const { eventId } = req.params
    if (!isValidObjectId(eventId)) return res.status(400).send({ err: "invalid eventId" })
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
    const user = await findById(userId)
    if(user.isAdmin == false) return res.status(400).send({err:"user가 admin이 아닙니다"})
    const { eventId } = req.params
    const { title, description, additional} = req.body
    const { userId } = req
    let event = await Event.findById(eventId)

    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId" })
    if (title && typeof title !== 'string') return res.status(400).send({ err: "title must be a string" })
    if (description && typeof description !== 'string') return res.status(400).send({ err: "description must be a string" })
    if (additional && typeof additional !== 'string') return res.status(400).send({ err: "additional must be a string" })
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

// 이벤트 삭제
eventRouter.delete('/:eventId', authAccessToken, async (req, res) => {
  try {
    const {  eventId } = req.params
    const { userId } = req
    if (!isValidObjectId(userId)) return res.status(401).send({ err: "invalid userId"})
    if (!isValidObjectId(eventId)) return res.status(400).send({ err: "invalid eventId"})

    let event = await Event.findById(eventId)
    if (userId !==event.user._id.toString()) return res.status(401).send({ err: "Unauthorized" })
    await findByIdAndDelete(eventId)
    console.log(event.title)
    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
  }
})


module.exports = eventRouter