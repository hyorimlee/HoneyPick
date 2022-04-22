const { Router } = require('express')
const searchRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')

searchRouter.get('/', async (req, res) => {
    try {
        const search = null
        // 컬렉션 검색 로직
        
        return res.status(200).send({ search })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})


module.exports = {
    searchRouter
}