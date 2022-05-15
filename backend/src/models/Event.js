const { Schema, model, Types: { ObjectId } } = require('mongoose')

const EventSchema = new Schema(
  {
    user: {
      _id: { type: ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true }
    },
    title: { type: String , required: true },
    description: { type: String, required: false },
    additional: { type: String, required: false },
    items: [{
      _id: { type: ObjectId, required: true, ref: 'item'},
      recommend: { type: Number, required: true, default: 0}
    }]
  },
  { timestamps: true })

const Event = model('event', EventSchema)

module.exports = { Event, EventSchema }
