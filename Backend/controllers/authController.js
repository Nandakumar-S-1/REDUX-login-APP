const bcrypt = require('bcrypt')
const User = require('../models/userSchama')
const jwt = require('jsonwebtoken')

const Signup = async (req,res) => {
    try {
        const {userName,email,phone,password,profilePicture} = req.body
        const userExist = await User.findOne({email})
        if(userExist){
            res.status(400).json({message:'User with this email alredy exist'})
        }

        const hashPass = await bcrypt.hash(password,10)
        const newUser = new User({
            userName,
            email,
            phone,
            password:hashPass,
            profilePicture:req.file ? req.file.path : null
        })

        await newUser.save()

        res.status(201).json({
            message:'signup successful',
            user:{
                id:newUser._id,
                userName:newUser.userName,
                email:newUser.email,
                phone:newUser.phone,
                profilePicture:newUser.profilePicture
            }
        })
    } catch (error) {
        res.status(500).json({message:'Error occured during signing up',error:error.message})
    }
}

const Login = async (req,res) => {
    try {
        const {email,password}=req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'User not found'})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:'1h',
        });

        res.cookie('userToken',token,{
            httpOnly:true,
            secure:false,
            maxAge:24*60*60*1000,
            sameSite:'strict'
        })

        res.status(200).json({
            message:'Login Is Succesful',
            user:{
                id:user._id,
                userName:user.userName,
                email:user.email,
                phone:user.phone
            }
        })

    } catch (error) {
        res.status(500).json({message:'Error occured during the login', error:error.message})
    }
}

module.exports ={
    Signup,
    Login
}