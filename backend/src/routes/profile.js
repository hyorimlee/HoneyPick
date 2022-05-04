const { Router } = require('express')
const profileRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

profileRouter.get('/', async (req, res) => {
    try {
        const user = null
        // 유저정보 조회 로직

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