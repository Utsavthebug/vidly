const {User,validateUser} = require('../models/user')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const _ = require('lodash')
const express = require("express")

const router = express.Router()


router.post('/',async (req,res)=>{
    // const {error} = validateUser(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    
    const user =await User.findOne({email:req.body.email})
    
    if (!user) return res.status(400).send("wrong email")

    const isPassword = await bcrypt.compare(req.body.password,user.password)

    if(!isPassword)  return res.status(401).send("Invalid email or password")

    const token = user.generateAuthToken() 
    res.send(token)

})

module.exports = router
