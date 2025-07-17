require('dotenv').config()
const express = require('express')
const cors= require('cors')
const connectDB = require('./config/db')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const allowedOrgins = ['http://localhost:5173']
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')


app.use(cors({
    origin:allowedOrgins,
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
connectDB()

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

//use routes
app.use('/auth',authRoute)
app.use('/user',userRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`);
    
})

