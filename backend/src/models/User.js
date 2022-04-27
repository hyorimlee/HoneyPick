const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    nickname: String,
    phone: {
        type:Schema.Types.String,
        ref:'phone',
    },
    follow: {
        type:Schema.Types.ObjectId,
        ref:'follow',
    },
    profile: {
        type:Schema.Types.String,
        ref:'profile',
    },
    review: {
        type:Schema.Types.String,
        ref:'review',
    },
}, { timestamps: true })

const User = model('user', UserSchema)

module.exports = { User }