const {createLogger,transports} = require("winston")

module.exports = createLogger({
    transports:[
        new transports.File({filename:'combined.log'})
    ]
})
