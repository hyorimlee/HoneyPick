const { Router } = require('express')
const phoneRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { Phone } = require('../models')

phoneRouter.post('/', async (req, res) => {
    try {
        const { phoneNumber } = req.body
        if(typeof phoneNumber !== 'string') return res.status(400).send({ err: "phoneNumber is required" })

        const verificationCode = Math.floor(Math.random()*1000000).toString().padStart(6, '0')
        
        // 문자 발송 로직

        const phone = new Phone({ phoneNumber, verificationCode })
        await phone.save()

        return res.status(201).send({ phone })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

phoneRouter.post('/check', async (req, res) => {
    try {
        const { phoneId, verificationCode } = req.body

        if(!isValidObjectId(phoneId)) return res.status(400).send({ err: "phoneId is invalid" })
        if(typeof verificationCode !== 'string') return res.status(400).send({ err: "verificationCode is required" })

        const phone = await Phone.findById(phoneId)
        if(!phone) res.status(400).send({ err: "phone does not exist" })

        if(phone.verificationCode !== verificationCode) return res.status(400).send({ err: "verificationCode is invalid" })

        const nowDate = new Date()
        const phoneDate = new Date(phone.createdAt)
        const minuteDiff = (nowDate.getTime() - phoneDate.getTime()) / (1000*60)
        if(minuteDiff > 5) return res.status(400).send({ err: "verificationCode is expired" })

        return res.status(200).send({ message: 'success', phoneNumber: phone.phoneNumber })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

module.exports = phoneRouter