const { Schema, model, Types: { ObjectId } } = require('mongoose')

const VoteSchema = new Schema(
  {
    collectionId: { type: ObjectId, required: false, ref: 'collection'},
    eventId: { type: ObjectId, required: false, ref: 'event'},
    title: { type: String, required: false },
    result: [{
      _id: { type: ObjectId, required: true, ref: 'item' },
      title: { type: String, required: true },
      thumbnail: { type: String, required: true },
      priceBefore: { type: Number, required: true },
      priceAfter: { type: Number, required: false },
      count: { type: Number, required: true, default: 0 }
    }],
    isPublic: { type: Boolean, required: true, default: true },
    isClosed: { type: Boolean, required: true, default: false },
    participants: [{ _id: { type: ObjectId, ref: 'user' } }]
  },
  { timestamps: true })

const Vote = model('vote', VoteSchema)

module.exports = { Vote, VoteSchema }
