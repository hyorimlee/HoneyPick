const { Router } = require('express')
const authRouter = Router()
const mongoose = require('mongoose')
const { isValidObjectId } = require('mongoose')
const { User,Follow } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateTokens = async function(userId,res){
    try {
        const [accessToken, refreshToken] = await Promise.all([
            jwt.sign({userId:userId},process.env.JWT_ACCESS_KEY,{expiresIn:process.env.JWT_ACESS_EXPIRESIN}),
            jwt.sign({userId:userId},process.env.JWT_REFRESH_KEY,{expiresIn:process.env.JWT_REFRESH_EXPIRESIN})
        ])
        return {accessToken,refreshToken}
    } catch (err) {
        console.log(err)
        return res.status(400).send({err:"err occurred while generate tokens"})
    }
}
function authAccessToken (req, res, next)  {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) return res.status(400).send({err:"wrong accessToken format or there is no accessToken"})
    try {
        console.log(accessToken)
        const {userId} = jwt.verify(accessToken,process.env.JWT_ACCESS_KEY)
        req.userId = userId
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).send({err:"Invaild accessToken"})
    }
}
authRouter.post('/signup', async (req, res) => {
    try {
        const {username,phone, nickname} = req.body
        if(typeof username!=="string") return res.status(400).send({err:"username is required"})
        if(typeof phone!=="string") return res.status(400).send({err:"phone is required"})
        if(typeof nickname!=="string") return res.status(400).send({err:"nickname is required"})
        
        if(nickname.length>10) return res.status(400).send({err:"length of nickname should less than 10"})
        if(username.length>10) return res.status(400).send({err:"length of username should less than 10"})

        if(await User.exists({username:username})) return res.status(400).send({ err: "duplicated username" })
        
        let user = new User(req.body)
        let follow = new Follow({ ...req.body, user})
        user.follow = follow._id
        const [{accessToken,refreshToken}]=await Promise.all([ 
            generateTokens(user._id),  
            follow.save(),       
            user.save()
        ])
        return res.status(201).send({userPk:user._id,username:req.body.username,description:"",profile:process.env.DEFAULT_PROFILE_IMG,accessToken:accessToken,refreshToken:refreshToken})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const {username,password} = req.body
        if(!username || !password) return res.status(400).send({err:'username and password is mandatory!'})
        try{
            const user = await User.findOne({username:username})
            if(user.withdraw==true) return res.status(400).send({err:`${await user.usename} is withdrawn user!`})
            if(await bcrypt.compare(password,user.password)==false) return res.status(400).send({err:'wrong password'})
            const accessToken = await generateAccessToken(user._id)
            const refreshToken = await generateRefreshToken(user._id)
            return res.status(201).send({userPk:user._id,username,description:"",profile:process.env.DEFAULT_PROFILE_IMG,accessToken:accessToken,refreshToken:refreshToken})
        }catch(err){
            console.log(err)
            return res.status(400).send({err:'error occurred while login'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ err: error.message })
    }
})
authRouter.post('/refresh',async (req,res)=>{
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) return res.status(400).send({err:"there is no refreshToken"})
        try {
            const {userId} = jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY)
            const accessToken = await generateAccessToken(userId)
            return res.status(201).send({msg:"new accessToken is generated!",accessToken:accessToken,refreshToken:refreshToken})
        } catch (err) {
            console.log(err)
            return res.status(403).send({err:"Invalid refreshToken"}) 
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({err:'error occurred while refresh token'})
    }
})

authRouter.delete('/',authAccessToken, async(req,res)=>{
    try {
        let user = await User.findById(req.userId)
        user.withdraw = true
        await user.save()

        return res.status(200).send({msg:`user [${user.username}] is withdrawn`})
    } catch (err) {
        console.log(err)
        return res.status(403).send({err:"error occurred while deleting user"})
    }
})

module.exports =  authRouter 
module.exports.authAccessToken = authAccessToken