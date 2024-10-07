
const userModel = require('./userModel')
const bcrypt = require('bcrypt')
const { param, validationResult} = require('express-validator')
const authMiddleware = require('../../middleware/authMiddleware')


exports.registerUser = async (req)=>{
    
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg).join(', ');
        throw new Error(errorMessages);
    }
    const user = req.body;
    const isuser = await userModel.User.findOne({email:user.email})
    if (isuser) {
        throw new Error('Email is already exists')
    }

    const hashedpassword = await bcrypt.hashSync(user.password,10)
    const newuser = new userModel.User({
        firstname:user.firstname,
        lastname:user.lastname,
        country: user.country,
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
        throw new Error(errorMessages);
    }
    const user = await userModel.User.findOne({email:req.body.email})
    if (!user){
        throw new Error('Incorrect Email')
    }
    const ispassword = bcrypt.compareSync(req.body.password,user.password)
    if (!ispassword){
        throw new Error('Incorrect password')
    }

    const token = authMiddleware.jwtAuth(user.firstname,user.email)


    return {firstname:user.firstname,token:token}
}

exports.updateUser = async (req)=>{
    const param1 = req.params.field1
    const param2 = req.params.field2
    const err = validationResult(req)
    if(!err.isEmpty()) {
        const errorMessages = err.array().map(error=>error.msg).join(', ')
        throw new Error(errorMessages)
    }
    const user =  await userModel.User.findOne({email: req.user.email})
    if (!user){
        throw new Error('user not found.')
    }

    const paramsList = ['email','tel','role','firstname']
    if(paramsList.includes(param1)){
        if(param2 == 'lastname'){
            user.firstname=req.body.firstname
            user.lastname = req.body.lastname
            const token = authMiddleware.jwtAuth(user.firstname,user.email);
            await user.save()
            return {msg:'succussfully updated', token}
        }
        else{
            user[param1] = req.body[param1]
            if(param1 == 'email') {
                const token = authMiddleware.jwtAuth(user.firstname,user.email);
                await user.save()
                return {msg:'succussfully updated', token}
            }
            
        }
    }
    return await user.save()
}