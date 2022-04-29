const { Schema, model, Types: { ObjectId } } = require('mongoose')
const { ItemSchema } = require('./Item')

const CollectionSchema = new Schema(
  {
    user: { type: ObjectId, required: true, ref: 'user' },
    title: { type: String , required: true },
    description: { type: String, required: false },
    thumbnail: { type: String, required: false },
    items: [ItemSchema],
    isPublic: { type: Boolean, required: true }
  },
  { timestamps: true })

const Collection = model('collection', CollectionSchema)

module.exports = { Collection, CollectionSchema }
