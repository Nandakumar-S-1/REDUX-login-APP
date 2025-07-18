const User = require('../models/userSchama')
const bcrypt = require('bcrypt')

const getHome = async(req,res)=>{
    try {
        res.status(200).send({message:'Welcome to admin dashboard'})
    } catch (error) {
        res.status(500).send({message:'Error occured accesing admin home'})        
    }
}

const showUser=async (req,res) => {
    try {
        const users = await User.find({isAdmin:false})
        if(!users || users.length===0){
            res.status(404).json({message:'User not found'})
        }
        return res.json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server error'})
    }
}

const addUser = async (req,res) => {
    const {userName,email,mobile,password}=req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:'user already exist witht this email, try a new email'})
        }
        const hashedPass = await bcrypt.hash(password,10)
        const newUser = new User({
            userName:userName,
            email:email,
            phone:phone,
            password:hashedPass
        })
        await newUser.save()
        res.status(200).json({message:'User added succesfully'})
    } catch (error) {
        console.log(error,'add user ------------');
        
        res.status(500).json({error:'Error adding new user'})
    }
}

const logOutLoad= async(req,res)=>{
    res.clearCookie('adminToken',{
        httpOnly:true,
        secure:false,
        sameSite:'Lax'
    })
    return res.status(200).json({message:'Logout is success'})
}

module.exports={
    getHome,
    addUser,
    showUser,
    logOutLoad
}