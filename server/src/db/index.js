const mongoose = require('mongoose')

const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/ecommerce`)
        console.log('db connected')
    } catch (error) {
        console.error('connection failed with db', error)
        process.exit(1)
    }
}

module.exports= connectDb