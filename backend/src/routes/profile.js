const { Router } = require('express')
const profileRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose') 
const { User } = require('../models')
const bcrypt = require('bcrypt')
<<<<<<< Updated upstream
const jwt = require('jsonwebtoken')
=======
const { authAccessToken } = require('./auth')
>>>>>>> Stashed changes

profileRouter.get('/', authAccessToken,async (req, res) => {
    try {
        if(!isValidObjectId(req.userId)) return res.status(400).send({ err: "유효하지 않은 user id" })
        const user = User.findById(req.userId)
        
        return res.status(200).send({ user })
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

module.exports = {
    profileRouter
}