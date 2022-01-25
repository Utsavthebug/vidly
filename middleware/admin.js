const auth = require('./auth')
module.exports = function(req,res,next) {
    // 401 unauthorized 
    //403 forbidden 
    auth(req,res,()=>{ 
    if(!req.user.isAdmin) return res.status(403).send('Access denied')
    next()
    })
}