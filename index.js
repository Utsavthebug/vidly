require('express-async-errors')
const Joi  = require("joi");
Joi.objectId = require("joi-objectid")(Joi)
const express = require("express")
const app = express()

require('./startup/routes')(app)
require('./startup/db')()


app.listen(3000,()=>console.log("Listening on port 3000"))
