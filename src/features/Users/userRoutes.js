const express = require('express')
const router = express.Router()
const controller = require('./userController')
const { userRegisterValidate }= require('../../middleware/validMiddleware')

router.get('/',(req,res)=>{
    const rr = 'this user feature.'
    res.status(200).send('This User feature.')
})
router.post('/register',userRegisterValidate(),controller.registerUser)




module.exports = router;