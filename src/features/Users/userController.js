const userService = require('./userService')
const { validationResult} = require('express-validator')

exports.registerUser= async(req,res)=>{
    try{
        const newuser = await userService.registerUser(req)
        res.status(201).json(newuser)
    }
    catch (err){
        res.status(400).json({error:err.message})
    }
}