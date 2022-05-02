const { Schema, model, Types: { ObjectId } } = require('mongoose')
const { UserSchema } = require('./User')

const FollowSchema = new Schema(
  {
    user: {
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true }
    },
    followings: [UserSchema],
    followers: [UserSchema]
  },
  { timestamps: true })

const Follow = model('follow', FollowSchema)

module.exports = { Follow }
