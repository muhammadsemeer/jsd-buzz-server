const token = require("../utils/token")

module.exports.verifyAdmin = (req,res,next) => {
    if (req.cookies.adminToken) {
        token.verify(req.cookies.adminToken,(err, decoded) =>{
            if (err) {
                return res.sendStatus(403) 
            } else {
                req.admin = decoded
                return next()
            } 
        })
    } else {
        return res.sendStatus(403) 
    }
}