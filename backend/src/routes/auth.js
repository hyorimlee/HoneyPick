const { Router } = require('express')
const authRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

authRouter.post('/signup', async (req, res) => {
    try {
        const {username,password,phone} = req.body
        const user = new User(req.body)
        await user.save()
        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)
        return res.status(201).send({user_pk:user._id,username,description:"",profile:process.env.DEFAULT_PROFILE_IMG,access_token:accessToken,refresh_token:refreshToken})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports =  authRouter