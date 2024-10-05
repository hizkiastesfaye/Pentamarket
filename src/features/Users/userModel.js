const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim:true
    },
    lastname: {
        type:String,
        required:true,
        trim:true
    },
    tel:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Buyer','Seller'],
        default:'Buyer'
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
    }
})
userSchema.pre('save', function(next){
    this.updated_at = Date.now();
    next();
})

const User = mongoose.model('User', userSchema)




// const addressSchema = mongoose.Schema({
//     user_id:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     country:{
//         type:String,
//         required:true,
//     },
//     state:{
//         type:String
//     },
//     city:{
//         type:String
//     },
//     street:{
//         type:String,
//         trim:true
//     },
//     postcode:{
//         type:String,
//         trim:true
//     }
    
// })

// const Address = mongoose.model('Address',addressSchema)


module.exports =User