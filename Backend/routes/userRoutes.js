const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')
const userAuth = require('../middleware/userAuth')
const upload = require('../utils/multer')

userRouter.get('/profile',)
