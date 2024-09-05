const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.router.js')
const productRouter = require('./routes/product.router.js')


const app = express()
app.use(
  cors({
    origin:"*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/profile', userRouter)
app.use('/product', productRouter)

module.exports= app