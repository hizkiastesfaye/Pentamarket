const express = require('express')
require('dotenv').config()
const router = express.Router()
const controller = require('./userController')
const validMiddleware= require('../../middleware/validMiddleware')
const jwtt = require('jsonwebtoken')
const authMiddleware = require('../../middleware/authMiddleware')


router.get('/',(req,res)=>{

    res.status(200).send('This User feature.')
})
router.get('/protected',authMiddleware.jwtVerify,(req,res)=>{
    res.json({msg:'This is protected url'})

})

router.post('/register',validMiddleware.userRegisterValidate(),controller.registerUser)
router.post('/login',validMiddleware.userLoginvalidate(),controller.loginUser)
router.put('/update/:field1/:field2?',authMiddleware.jwtVerify,validMiddleware.userUpdateValidate(),controller.updateUser)
router.get('/get',authMiddleware.jwtVerify,controller.getUser)
router.delete('/delete/:email',authMiddleware.jwtVerify,controller.deleteUser)

module.exports = router;