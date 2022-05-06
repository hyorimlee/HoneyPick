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

profileRouter.patch('/', async (req, res) => {
    try {

        const user = null
        // 프로필 수정 로직

        return res.status(200).send({ user })
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