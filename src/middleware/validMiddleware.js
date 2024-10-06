const { body } = require('express-validator')

const userRegisterValidate = ()=>{
    return [
        body('firstname').notEmpty().withMessage('first name is required'),
        body('lastname').notEmpty().withMessage('lastname is required'),
        body('tel').notEmpty().withMessage('tel is required'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({min:8}).withMessage('Password must be at least 8 character long.'),

    ]
}
const userLoginvalidate = ()=>{
    return [
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({min:8}).withMessage('Password must be at least 8 character long.'),
    ]
}
module.exports ={ userRegisterValidate, userLoginvalidate } 