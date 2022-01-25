const mongoose = require("mongoose")
require('dotenv').config()
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const {Schema} = mongoose


const UserSchema = new Schema ({
    name : {type:String,minlength:0,required:true,minlength:5,maxlength:50},
    email : {type:String,unique:true,minlength:5,maxlength:255},
    password:{type:String,required:true},
    isAdmin : {type:Boolean,default:false}
})

UserSchema.methods.generateAuthToken = function () {
    const token  = jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.JWT_PRIVATEKEY)
    return token
}

function validateUser(user) {
 const schema = Joi.object({
name: Joi.string().min(5).max(50).required(),
email:Joi.string().min(5).max(255).required().email(),
password:Joi.string().min(5).max(255).required()
 })
 return schema.validate(user)
}

const User = mongoose.model('User',UserSchema)
exports.User=User
exports.validateUser = validateUser