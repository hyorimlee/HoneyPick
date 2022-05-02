const { Schema, model, Types: { ObjectId } } = require('mongoose')

const FollowSchema = new Schema(
  {
    user: {
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true }
    },
    followings: [{
      _id: { type: ObjectId, required: true, ref: 'profile' },
      user: { type: ObjectId, required: true, ref: 'user' },
      nickname: { type: String, required: true },
      image: { type: String, required: false },
      description: { type: String, required: false }
    }],
    followers: [{
      _id: { type: ObjectId, required: true, ref: 'profile' },
      user: { type: ObjectId, required: true, ref: 'user' },
      nickname: { type: String, required: true },
      image: { type: String, required: false },
      description: { type: String, required: false }
    }]
  },
  { timestamps: true })

const Follow = model('follow', FollowSchema)

module.exports = { Follow }
