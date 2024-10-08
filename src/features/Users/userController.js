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

exports.updateUser = async (req,res)=>{
    try{
        const response = await userService.updateUser(req)
        res.status(201).json(response)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.getUser = async (req,res)=>{
    try{
    const getuser = await userService.getUser(req)

    res.status(200).json(getuser)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


exports.deleteUser = async (req,res)=>{
    try{
        const deleteuser = await userService.deleteUser(req)
        res.status(204).json(deleteuser)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}