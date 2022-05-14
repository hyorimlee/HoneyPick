const { Schema, model, Types: { ObjectId } } = require('mongoose')

const CollectionSchema = new Schema(
  {
    title: { type: String , required: true },
    description: { type: String, required: false },
    additional: {type:String, required: false},
    items: [{
      _id: { type: ObjectId, required: true, ref: 'item'},
      recommend: { type: Number, required: true, default: 0}
    }],
    isPublic: { type: Boolean, required: true }
  },
  { timestamps: true })

const Collection = model('collection', CollectionSchema)

module.exports = { Collection, CollectionSchema }
