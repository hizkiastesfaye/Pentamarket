const express = require('express')
require('dotenv').config()
const router = express.Router()
const controller = require('./userController')
const { userRegisterValidate, userLoginvalidate }= require('../../middleware/validMiddleware')
const jwtt = require('jsonwebtoken')
const authMiddleware = require('../../middleware/authMiddleware')


router.get('/',(req,res)=>{

    res.status(200).send('This User feature.')
})
router.get('/protected',authMiddleware.jwtVerify,(req,res)=>{
    res.json({msg:'This is protected url'})

})

router.post('/register',userRegisterValidate(),controller.registerUser)
router.post('/login',userLoginvalidate(),controller.loginUser)



module.exports = router;