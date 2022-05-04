const { Schema, model, Types: { ObjectId } } = require('mongoose')
const { UserSchema } = require('./User')

const VoteSchema = new Schema({
  collectionId: { type: ObjectId, required: true, ref: 'collection' },
  result: [{
    _id: { type: ObjectId, required: true, ref: 'item' },
    count: { type: Number, required: true, default: 0 }
  }],
  isClosed: { type: Boolean, required: true, default: false },
  participants: [{ _id: { type: ObjectId, ref: 'user' } }]
}, { timestamps: true })

const Vote = model('vote', VoteSchema)

module.exports = { Vote, VoteSchema }
