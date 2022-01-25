const mongoose  = require("mongoose")
require("dotenv").config()
const logger = require("../logger/log")

module.exports = function () {
mongoose.connect(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>logger.info("mongodb connected.."))
.catch((err)=>console.log(err))
}