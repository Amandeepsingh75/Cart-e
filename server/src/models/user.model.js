const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
},
password:{
    type:String,
    required:[true, 'password is required']
},
avatar:{
    type:String,
    required:true
},
}, {timestamps: true})


// this func for checking if password is same as what we have in db for login

// userSchema.methods.isPassworMatching= async function(password){
//     return await bcrypt.compare(password, this.password)
// }

userSchema.methods.accessGenerateToken= function(){
   return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRE})
}

const User = mongoose.model("User", userSchema)

module.exports = User