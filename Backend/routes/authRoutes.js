const express=require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const upload= require('../utils/multer')

router.post('/signup',upload.single('profilePicture'),authController.Signup)
router.post('/login',authController.Login)


module.exports=router