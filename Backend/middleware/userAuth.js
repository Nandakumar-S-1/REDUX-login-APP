const User = require('../models/userSchama')
const jwt = require('jsonwebtoken')

const protect =(req,res,next)=>{
    const token = req.cookies.userToken
    if(!token){
        return res.status(401).json({message:'No token is available, authorization has debied'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        res.status(400).json({message:'Token is not valid'})
    }
}

module.exports ={
    protect
}
