const inventoryModel = require('./inventoryModel')
const userModel = require('../Users/userModel')
const productModel = require('../Products/productModel')
const {validationResult} = require('express-validator')

exports.addInventory = async (req)=>{

    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessages)
    }

    const user = await userModel.User.findOne({email:req.user.email})
    const role = ['Seller','admin']
    if(!role.includes(user.role)){
        throw new Error("permission denied: admin and seller have access to inventory")
    }
    const product = await productModel.product.findOne({
        sku:req.body.productSku,
        sellerId:user._id
    })
    if(!product){
        throw new Error('product not found')
    }
    const inventory = await inventoryModel.Inventory.findOne({
        invSku:req.body.invSku,
        productId:product._id
    })

    if(inventory){
        throw new Error('The inventory already exists')
    }
    const newinventory = new inventoryModel.Inventory({
        productId: product._id,
        invSku:req.body.invSku,
        invStockLevel:req.body.invStockLevel,
        price:req.body.price,
        location:req.body.location
    })
    // console.log(newinventory)
    return(await newinventory.save())
}


exports.getInventory = async (req)=>{
    const param1 = req.params.productSku
    const param2 = req.params.invSku
    const user = await userModel.User.findOne({email:req.user.email})
    
    const role = ['Seller','admin']
    if(!role.includes(user.role)){
        console.log(!role.includes(user.role))
        throw new Error("permission denied: only admin and seller have access to inventory")
    }
    const product = await productModel.product.findOne({
        sku:param1,
        sellerId:user._id
    })
    if(!product){
        throw new Error('Product not found')
    }
    const inventory= await inventoryModel.Inventory.findOne({
        invSku:param2,
        productId:product._id
    })
    if(!inventory){
        throw new Error(`inventory not found`)
    }
    return {
        productSku:product.sku,
        invSku:inventory.invSku,
        invStockLevel:inventory.invStockLevel,
        price:inventory.price,
        location:inventory.location
    }
}