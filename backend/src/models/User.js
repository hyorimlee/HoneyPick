const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const saltRound = 10
const UserSchema = new Schema({
    username: { type: String, required: true , unique: true },
    password: { type: String, required: true},
    nickname: String,
    nickname: { type: String, required: true},
    phone:{ type: String, required:true},
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
