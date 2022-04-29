const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    nickname: String,
<<<<<<< HEAD
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
=======
    image: String,
    description: String,

    // following: [UserSchema],
    // follower: [UserSchema],
    
    // Chat도 Collection의 Hashtags와 마찬가지
    // chat: []

    items: [ItemSchema],
    collections: [CollectionSchema],

>>>>>>> ea63f03a648f4256bc6235f7870619aeaf0269e7
}, { timestamps: true })

const User = model('user', UserSchema)

module.exports = { User, UserSchema }