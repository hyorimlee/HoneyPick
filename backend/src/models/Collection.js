const { Schema, model } = require('mongoose')

const CollectionSchema = new Schema({
    title: { type: String , required: true },
    description: { type: String, required: false },
    // 고려 포인트 1. 이 부분 어떻게 해야할지 고민 중 -> Hashtag Schema 따로 만드는 것도 괜찮을수도
    // hashtags: { type: String, required: false },
    items: [ItemSchema],
    like_users: [UserSchema],

}, { timestamps: true })

const Collection = model('collection', CollectionSchema)

module.exports = { Collection }