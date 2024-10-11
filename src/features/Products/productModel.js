const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    catagoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductCatagory',
        required:true
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    sku:{
        type:String,
        required:true,
    },
    stockLevel:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
    }
})
productSchema.index({sellerId:1,sku:1}, {unique:true})



const productCatagorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description: String,
    createdAt: {
        type:Date,
        default:Date.now()
    },
    updateAt: {
        type:Date,
    }
})


productSchema.pre('save',function(next){
    this.updateAt = Date.now()
    next()
})

productCatagorySchema.pre('save',function(next){
    this.updateAt = Date.now()
    next()
})
const product = mongoose.model('Product',productSchema)
const productCatagory = mongoose.model('ProductCatagory',productCatagorySchema)

module.exports = {product, productCatagory}