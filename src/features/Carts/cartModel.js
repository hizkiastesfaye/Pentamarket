const mongoose = require('mongoose')
const { SellerProduct, Inventory } = require('../Inventory/inventoryModel')

const cartSchema = mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    inventoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','inprogress','completed','cancelled','failed'],
        required:true,
        default:'pending'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
})

cartSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})


const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart