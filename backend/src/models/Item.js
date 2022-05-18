const { Schema, model } = require('mongoose')

const ItemSchema = new Schema({
    url: { type: String, required: true },
    title: { type: String , required: false },
    thumbnail: { type: String, required: false, default: 'honeypick.png' },
    priceBefore: { type: Number, required: false },
    priceAfter: { type: Number, required: false },
    discountRate: { type: Number, required: false },

    // 스티커의 경우 Object로 넣고 1씩 더하는 방법 사용
    stickers: { type: Object, required: true, default: { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 }},

}, { timestamps: true })

ItemSchema.index({ title: 'text' })
const Item = model('item', ItemSchema)
Item.createIndexes()

module.exports = { Item, ItemSchema }