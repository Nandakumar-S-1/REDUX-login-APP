const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')
const userAuth = require('../middleware/userAuth')
const upload = require('../utils/multer')

userRouter.get('/profile',userController.userProfile)
// userRouter.put('/update/:id',userAuth.protect,upload.single('profilePicture'),userController.updateProfile)

userRouter.put('/update', userAuth.protect, upload.single('profilePicture'), userController.updateProfile);
userRouter.post('/logout',userController.logOut)

module.exports=userRouter

