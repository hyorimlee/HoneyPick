const { Schema, model, Types: { ObjectId } } = require('mongoose')

const CollectionSchema = new Schema(
  {
    user: {
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true },
      nickname: { type: String, required: true }
    },
    title: { type: String , required: true },
    description: { type: String, required: false },
    items: [{
      _id: { type: ObjectId, required: true, ref: 'item'},
      title: { type: String, required: false },
      priceAfter: { type: Number, required: false },
      thumbnail: { type: String, required: false },
      recommend: { type: Number, required: true, default: 0}
    }],
    isPublic: { type: Boolean, required: true }
  },
  { timestamps: true })

const Collection = model('collection', CollectionSchema)

module.exports = { Collection, CollectionSchema }
