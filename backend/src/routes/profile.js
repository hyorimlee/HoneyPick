const { Router } = require('express')
const profileRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose') 
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { authAccessToken } = require('./auth')

profileRouter.get('/', authAccessToken,async (req, res) => {
    try {
        if(!isValidObjectId(req.userId)) return res.status(400).send({ err: "유효하지 않은 user id" })
        const user = await User.findById(req.body.userId)
        if(user.withdraw) return res.status(400).send({msg:"탈퇴한 회원의 정보를 조회하려 하고 있습니다"})
        return res.status(200).send({ msg:"hi",username:user.username,nickname:user.nickname,profileImage:user.image,description:user.description,following:user.followingCount,follower:user.followerCount})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

profileRouter.patch('/',authAccessToken, async (req, res) => {
    try {
        let user = await User.findById(req.userId)
        const {username,nickname,profileImage,description,phone} = req.body
        if(username){
            if(typeof username!=="string") return res.status(400).send({err:"username 형식이 잘못되었습니다."})
            if(await User.findOne({username:username})) return res.status(400).send({err:"이미 존재하는 username입니다"})
            if(username.length>10) return res.status(400).send({err:"username 길이가 10을 넘습니다"})
            user.username = username
        }
        if(nickname){
            if(typeof nickname!=="string") return res.status(400).send({err:"nickname 형식이 잘못되었습니다."})
            if(nickname.length>10) return res.status(400).send({err:"nickname 길이가 10을 넘습니다"})
            user.nickname = nickname
        }
        if(phone){
            if(typeof phone!=="string") return res.status(400).send({err:"phone 형식이 잘못되었습니다."})
            user.phone = phone
        }
        if(profileImage) {
            if(typeof profileImage!=="string") return res.status(400).send({err:"profileImage 형식이 잘못되었습니다."})
            user.profileImage = profileImage
        }
        if(description){
            if(typeof description!=="string") return res.status(400).send({err:"description의 형식이 잘못되었습니다."})
            user.description = description
        }
        await user.save()
        return res.status(200).send({msg:"DONE",user:user.username })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

profileRouter.patch('/password', async (req, res) => {
    try {
        const user = null
        // 비밀번호 변경 로직

        return res.status(200).send({ user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports =  profileRouter