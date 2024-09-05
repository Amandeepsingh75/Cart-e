require('dotenv').config()
const connectDb = require('./db/index.js')
const app = require('./app.js')

connectDb().then(()=>{
app.listen(process.env.PORT || 4000, ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
}) 
}).catch((err)=>{
    console.error('error on index page , connectio failed with db')
})