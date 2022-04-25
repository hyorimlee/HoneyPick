const { Schema, model } = require('mongoose')

const PhoneSchema = new Schema({
    phone_number: { type: String, required: true },
    verification_code: { type: String , required: true },
}, { timestamps: true })

const Phone = model('phone', PhoneSchema)

module.exports = { Phone }