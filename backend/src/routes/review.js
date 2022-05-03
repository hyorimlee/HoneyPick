const { Router } = require('express')
const reviewRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User, Item, Review } = require('../models')

const { authAccessToken } = require('./auth')

reviewRouter.post('/', authAccessToken, async (req, res) => {
  try {
      const { itemId } = req.params
      if(!isValidObjectId(itemId)) return res.status(400).send({ err: "invalid itemId" })
      const userId = req.userId

      const [user, item] = await Promise.all([
        User.findById(userId),
        Item.findById(itemId)
      ])

      if(!user) res.status(400).send({ err: "user does not exist" })
      if(!item) res.status(400).send({ err: "item does not exist" })

      const { isRecommend, stickers } = req.body      
      if (typeof isRecommend !== 'number') return res.status(400).send({ err: "isRecommend is required"});
      if (typeof stickers !== 'array') return res.status(400).send({ err: "stickers is required"});

      review = new Review({ user, item, ...req.body })

      const changedStickers = calStickers([], stickers)

      await Promise.all([
        review.save(),
        item.updateOne({ $inc : changedStickers })
      ])

      return res.status(200).send({ review })
  } catch (error) {
      console.log(error)
      return res.status(500).send({ err: error.message })
  }
})

reviewRouter.patch('/:reviewId', authAccessToken, async (req, res) => {
  try {
    const { itemId, reviewId } = req.params
    if(!isValidObjectId(reviewId)) return res.status(400).send({ err: "invalid itemId" })

    const { isRecommend, stickers } = req.body      
    if (typeof isRecommend !== 'number') return res.status(400).send({ err: "isRecommend is required"});
    if (typeof stickers !== 'array') return res.status(400).send({ err: "stickers is required"});

    const review = await Review.findByIdAndUpdate(reviewId, { $set: { isRecommend, stickers } })

    const changedStickers = calStickers(review.stickers, stickers)
    await Item.updateOne({ _id: itemId }, { $inc: changedStickers })

    return res.status(200).send({ message: "success" })
} catch (error) {
    console.log(error)
    return res.status(500).send({ err: error.message })
}
})

// 스티커 개수 변화 계산
function calStickers(oldReview, newReview) {
  var stickers = {}
  
  const remains = newReview.filter((a)=>{
    idx = oldReview.indexOf(a)
    if(idx > -1) {
      oldReview.splice(idx, 1)
      return false
    }
    else return true
  })

  for (var i=0; i < remains.length; ++i)
    stickers['stickers.' + remains[i]] = 1

  for (var i=0; i < oldReview.length; ++i)
    stickers['stickers.' + oldReview[i]] = -1
  return stickers
}

module.exports = reviewRouter
