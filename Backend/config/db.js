const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/UMS-Redux')
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(`database connection error:`,error);
        process.exit(1)
    }
}

module.exports =connectDB