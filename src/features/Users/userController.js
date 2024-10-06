const userService = require('./userService')

exports.registerUser= async(req,res)=>{
    try{
        const newuser = await userService.registerUser(req)
        res.status(201).json(newuser)
    }
    catch (err){
        res.status(400).json({error:err.message})
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const user = await userService.loginUser(req)
        res.status(200).json(user)
    }
    catch (err){
        res.status(400).json({error:err.message})
    }
}