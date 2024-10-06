
const userModel = require('./userModel')
const bcrypt = require('bcrypt')
const { validationResult} = require('express-validator')
const authMiddleware = require('../../middleware/authMiddleware')


exports.registerUser = async (req)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg).join(', ');
        throw new Error(errorMessages);
    }
    const user = req.body;
    const isuser = await userModel.findOne({email:user.email})
    if (isuser) {
        throw new Error('Email is already exists')
    }

    const hashedpassword = await bcrypt.hashSync(user.password,10)
    const newuser = new userModel({
        firstname:user.firstname,
        lastname:user.lastname,
        tel:user.tel,
        email:user.email,
        password:hashedpassword
    })
    
    return await newuser.save()
}


exports.loginUser = async (req)=>{
    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(', ');
        console.log(errorMessages)
        throw new Error(errorMessages);
    }
    const user = await userModel.findOne({email:req.body.email})
    if (!user){
        throw new Error('Incorrect Email')
    }
    const ispassword = bcrypt.compareSync(req.body.password,user.password)
    if (!ispassword){
        throw new Error('Incorrect password')
    }

    const token = authMiddleware.jwtAuth(user.firstname)
    

    return {firstname:user.firstname,token:token}

}
