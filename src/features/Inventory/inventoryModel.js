const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    invSku:{
        type:String,
        required:true,
        trim:true
    },
    invStockLevel:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
})
inventorySchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})

const Inventory = mongoose.model('Inventory',inventorySchema)

module.exports = { Inventory }