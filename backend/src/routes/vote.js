const { Router } = require('express')
const voteRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Vote } = require('../models')

voteRouter.post('/', async (req, res) => {
    try {
        const vote = null
        // 투표 생성 로직

        return res.status(201).send({ vote })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

voteRouter.get('/:userId', async (req, res) => {
    try {
        const user = null
        // 투표 목록 조회
        // 페이지네이션 필요할 듯
        const vote = Array(1)
        
        return res.status(200).send({ vote })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

voteRouter.get('/:voteId', async (req, res) => {
    try {
        const vote = null
        // 투표 상세 조회
        
        return res.status(200).send({ vote })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


voteRouter.patch('/:voteId', async (req, res) => {
    try {
        const vote = null
        // 투표 종료 로직

        return res.status(200).send({ vote })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

voteRouter.patch('/:voteId/:itemId', async (req, res) => {
    try {
        const vote = null
        const item = null
        // 투표하기 로직

        return res.status(200).send({ vote })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = {
    voteRouter
}