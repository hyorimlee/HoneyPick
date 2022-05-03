const { Schema, model, Types: { ObjectId } } = require('mongoose')
const { CollectionSchema } = require('./Collection')

const ResultSchema = new Schema({ 
    item: { type: ObjectId, required: true, ref: "item" },
    voteCount: { type: Number, required: true, default: 0 },
})

const VoteSchema = new Schema({
    collectionId: { type: ObjectId, required: true, ref: "collection" },
    
    // 이 표현식이 맞는지는 모르겠음. 실제로 동작하는지 확인 필요.
    result: [ResultSchema],
}, { timestamps: true })

const Vote = model('vote', VoteSchema)

module.exports = { Vote, VoteSchema }