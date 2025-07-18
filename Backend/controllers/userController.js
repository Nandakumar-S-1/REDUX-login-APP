const User = require('../models/userSchama')

const userProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(!user){
            return res.send(404).json({message:'user not found'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

const updateProfile = async (req,res) => {
    try {
        const {userName,email,phone}= req.body
        const user= await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message:'user not dound'})
        }
        const updatedProfileData = {
            userName:userName || user.userName,
            email:email || user.email,
            phone:phone || user.phone
        }

        if(req.file){
            updatedProfileData.profilePicture = '/uploads/',req.file.fileName
        }
        const updatedUser =  await User.findByIdAndUpdate(req.params.id,updatedProfileData,{new:true})

        console.lof(updatedUser)

        res.status(200).json({
            message:'profile updated successfully',
            user:updatedUser
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const logOut = (req,res)=>{
    res.clearCookie('userToken')
    res.status(200).json({message:'logged out succesfully'})
}

module.exports ={
    updateProfile,
    userProfile,
    logOut
}