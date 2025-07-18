require('dotenv').config()
const express = require('express')
const cors= require('cors')
const connectDB = require('./config/db')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
// const allowedOrgins = ['http://localhost:5173']
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const adminRoute= require('./routes/adminRoutes')


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
connectDB()

app.use('/uploads',express.static(path.join(__dirname,'uploads')))


app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/admin',adminRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running in http://localhost:${PORT}`);
    
})

