const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
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
        enum:['pending','confirmed','processing','shipped','delivered','cancelled','failed','returned','refunded'],
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

orderSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})


const Order = mongoose.model('Order',orderSchema)

module.exports = Order