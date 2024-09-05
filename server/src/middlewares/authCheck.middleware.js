const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')

const CheckUserLoginOrNot = async(req, res , next)=>{
    try {
        const userAccessToken=req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '')
        if(!userAccessToken) {
            return res.status(400).json({msg:"User is not login "})
        }
        const decodedToken = jwt.verify(userAccessToken, process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken){
            return res.status(400).json({msg:"Something went wrong during decoding access token"})
        }
        const user= await User.findById(decodedToken?._id).select('-password')
        if(!user){
            return res.status(400).json({msg:'User does not exist'})
        }
        req.user= user
        next()
    } catch (error) {
        console.error(error)
         res.status(400).json({msg:"error while checking user is login or not"})
    }
}

module.exports= CheckUserLoginOrNot