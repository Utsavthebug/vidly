const auth = require('../middleware/auth')
const {User,validateUser} = require('../models/user')
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const express = require("express")
const _ = require('lodash')
const req = require('express/lib/request')
const router  = express.Router()

router.get('/me',auth,async(req,res)=>{
    const user  = await User.findById(req.user._id).select('-password')
    res.send(user)
})


router.post('/',async (req,res)=>{
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user  =  await User.findOne({email:req.body.email})
    if (user) return res.status(400).send('User already registered')

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    
    user = new User(_.pick(req.body,['name','email']))
    user.password = hashedPassword
    await user.save()

     
    res.status(200).send(
        _.pick(user,['name','email','_id'])
    )

})


module.exports = router