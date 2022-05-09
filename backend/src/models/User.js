const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const { CollectionSchema } = require('./Collection')
const { VoteSchema } = require('./Vote')
const saltRound = 10
const UserSchema = new Schema({
    username: { type: String, required: true , unique: true , maxlength:10 },
    password: { type: String, required: true},
    nickname: { type: String, required: true , maxlength:10},
    phone:{ type: String, required: true},
    image: {type: String, default: process.env.DEFAULT_PROFILE_IMG},
    description: {type: String, default: ""},
    followingCount: {type: Number, default: 0},
    followerCount: {type: Number, default: 0},
    collections: [CollectionSchema],
    votes: [VoteSchema],
    follow: {
        type:Schema.Types.ObjectId,
        ref:'follow',
    },
    review: {
        type:Schema.Types.String,
        ref:'review',
    },
    withdraw: {type: Boolean, default:false},
}, { timestamps: true })

UserSchema.pre('save',function(nxt){
    // hashing pwd
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRound,function(err,salt){
            if(err)  nxt(err)
            bcrypt.hash(user.password,salt,function(err,hash){
                user.password = hash
                 nxt()
            })
        })
    }else  nxt()
})

const User = model('user', UserSchema)

module.exports = { User, UserSchema }
