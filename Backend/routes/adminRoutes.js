const express = require('express')
const adminRoute = express.Router()

const adminAuthMid = require('../middleware/adminAuth')
const adminControlller = require('../controllers/adminController')

adminRoute.post('/login',adminAuthMid.adminAuth)
adminRoute.get('/home',adminAuthMid.adminVerification,adminControlller.getHome)
adminRoute.get('/dashboard',adminAuthMid.adminVerification,adminControlller.showUser)
adminRoute.post('/addUser',adminAuthMid.adminVerification,adminControlller.addUser)
adminRoute.post('/logout',adminControlller.logOutLoad)
adminRoute.put('/edit/:id',adminAuthMid.adminVerification,adminControlller.editUser)
adminRoute.delete('/deleteUser/:id',adminAuthMid.adminVerification,adminControlller.deleteUser)
module.exports= adminRoute