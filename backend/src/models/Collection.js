const { Schema, model, Types: { ObjectId } } = require('mongoose')

const CollectionSchema = new Schema(
  {
    title: { type: String , required: true },
    description: { type: String, required: false },
    items: [ItemSchema],
    like_users: [UserSchema],
    user: { type: ObjectId, required: true },
    isPublic: { type: Boolean, required: true }
  },
  { timestamps: true })

const Collection = model('collection', CollectionSchema)

module.exports = { Collection, CollectionSchema }
