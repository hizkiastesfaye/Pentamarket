
const userModel = require('./userModel')
const bcrypt = require('bcrypt')
const { validationResult} = require('express-validator')


const Users = [
    {id:1,name:'john',password:'1234567890'},
    {id:2,name:'will',password:'0987654321'}
]

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

