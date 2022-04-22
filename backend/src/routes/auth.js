const { Router } = require('express')
const authRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User } = require('../models')

authRouter.post('/signup', async (req, res) => {
    try {
        const user = null
        // 회원가입 로직

        return res.status(201).send({ user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


// 그냥 대충 여기서 쓰는데 체크는 성공할시는 pass, error 시 return res.status(400).send({ err: '에러원인' }) 이 기본적으로 들어가야함
authRouter.post('/login', async (req, res) => {
    try {
        const user = null
        // 로그인 로직 
        // 1. username, password 빈 값 체크
        // 2. DB에서 username, 해쉬된 password와 비교
        // 3. 일치여부 체크

        return res.status(200).send({ user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


module.exports = {
    authRouter
}