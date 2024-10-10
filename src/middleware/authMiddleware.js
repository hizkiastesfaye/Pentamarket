require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKe = '1234567890'
const secretKey = process.env.SECRET_KEY

exports.jwtAuth =(firstname,email,role)=>{
    const payload = {firstname:firstname,email:email,role}
    const token = jwt.sign(payload,secretKey,{expiresIn:'1h'})
    return token
}

exports.jwtVerify=(req,res,next)=>{
    const headauth = req.headers['authorization']
    if (!headauth) return res.status(400).json({msg:'invalid token'});
    const token = headauth.split(' ')[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if (err) return res.status(401).json({message:'Invalid token'});
        req.user = user
        next()
    })
    
    
}