const { Router } = require('express')
const phoneRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Phone } = require('../models')

phoneRouter.post('/', async (req, res) => {
    try {
        const phone = null
        // 핸드폰 인증번호 생성 로직

        return res.status(201).send({ phone })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

phoneRouter.post('/check', async (req, res) => {
    try {
        const phone = null
        // 핸드폰 인증 로직
        // 1. objectId, code 체크
        // 2. DB에 저장된 코드와 일치하는지 체크
        // 3. 유효기간 만료되었을 시 삭제 (5분 -> 1000ms * 300), Fail 반환

        return res.status(200).send({ phone })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


module.exports = {
    phoneRouter
}