const { Schema, model } = require('mongoose')
const { CollectionSchema } = require('./Collection')
const { VoteSchema } = require('./Vote')

const ProfileSchema = new Schema(
  {
    nickname: { type: String, required: true },
    image: { type: String, required: false },
    description: {},
    followingCount: { type: Number, default: 0, required: true },
    followerCount: { type: Number, default: 0, required: true },
    collections: [CollectionSchema],
    votes: [VoteSchema]
  },
  { timestamps: true }
)

const Profile = model('profile', ProfileSchema)

module.exports = { Profile }
