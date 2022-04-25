const { Schema, model } = require('mongoose')

const ItemSchema = new Schema({
    url: { type: String, required: true },
    title: { type: String , required: false },
    price: { type: Number, required: false },
    thumbnail: { type: String, required: false },
    discountRate: { type: Number, required: false },

    // register ?? 해당 아이템을 등록한 사람은 필요있을까? 싶음.
    // 차라리 해당 아이템을 꿀템으로 등록한 사람, 굿템으로 등록한 사람 수를 세는게 맞는것같음 그리고 그건 스티커처럼 숫자로 표현하는게 나을듯

    // 스티커의 경우 Object로 넣고 1씩 더하는 방법 사용
    stickers: { type: Object, required: true, default: { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 }},

}, { timestamps: true })

const Item = model('item', ItemSchema)

module.exports = { Item }