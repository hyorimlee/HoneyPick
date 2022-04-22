const { Schema, model } = require('mongoose')
const { ItemSchema } = require('./Item')
const { CollectionSchema } = require('./Collection')

const UserSchema = new Schema({
    username: { type: String, required: true , unique: true },
    password: { type: String, required: true },

    // phone 인증번호 doc을 가져올 수도 있음
    phone: { type: String, required: true },

    nickname: String,
    image: String,
    description: String,
    following: [UserSchema],
    follower: [UserSchema],
    
    // Chat도 Collection의 Hashtags와 마찬가지
    // chat: []

    items: [ItemSchema],
    collections: [CollectionSchema],

}, { timestamps: true })

const User = model('user', UserSchema)

module.exports = { User }