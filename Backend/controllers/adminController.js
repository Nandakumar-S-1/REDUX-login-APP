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
