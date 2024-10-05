const userService = require('./userService')
const { validationResult} = require('express-validator')

exports.registerUser= async(req,res)=>{
    try{
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array()});
        // }
        // const user = req.body
        // console.log("=====first=================",user)
        const newuser = await userService.registerUser(req)

        console.log("=======second===============",user)
        res.status(201).json(newuser)
    }
    catch (err){
        console.log("=======second===============",err.message)
        res.status(400).json({error:err.message})
    }
}