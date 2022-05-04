const { Schema, model, Types: { ObjectId } } = require('mongoose')

const FollowSchema = new Schema(
  {
    user: {
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true }
    },
    followings: [{
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true },
      nickname: { type: String, required: true },
      description: { type: String, required: false },
      image: { type: String, required: false }
    }],
    followers: [{
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true },
      nickname: { type: String, required: true },
      description: { type: String, required: false },
      image: { type: String, required: false }
    }]
  }
)

const Follow = model('follow', FollowSchema)

module.exports = { Follow }
