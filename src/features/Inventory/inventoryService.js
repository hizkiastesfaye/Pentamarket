const inventoryModel = require('./inventoryModel')
const userModel = require('../Users/userModel')
const productModel = require('../Products/productModel')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')

exports.addInventory = async (req)=>{

    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessages)
    }

    const user = await userModel.User.findOne({email:req.user.email})
    const role = ['Seller','admin']
    if(!role.includes(user.role)){
        throw new Error("permission denied: only admin and seller have access to inventory")
    }
    // console.log(user._id,'\n',user.id,'-----------------+++++++++++')
    // console.log(await userModel.User.findById(user._id))
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
    await newinventory.save()
    const newSellerProduct = new inventoryModel.SellerProduct({
        sellerId: user._id,
        productId: product._id,
        inventoryId:newinventory._id
    })
    await newSellerProduct.save()
    console.log(newSellerProduct)
    return(newinventory)
}


exports.getInventory = async (req)=>{

    const param1 = req.params.productSku
    const param2 = req.params.invSku
    if(!param1 || !param2){
        throw new Error('Invalid params')
    }
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
        throw new Error('product not found')
    }
    const inventory= await inventoryModel.Inventory.findOne({
        invSku:param2,
        productId:product._id
    })
    if(!inventory){
        throw new Error(`inventory not found`)
    }
    const sellerProduct = await inventoryModel.SellerProduct.findOne({inventoryId:inventory._id})
    inventory.sellerProductId = sellerProduct.id
    console.log(inventory)
    // console.log(sellerProduct.id)

    return {
        insvsku:inventory.invsku,
        invStockLevel:inventory.invStockLevel,
        price:inventory.price,
        sellerProductId:sellerProduct.id
    }
}

exports.updateInventory = async (req)=>{

    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessages)
    }

    const user = await userModel.User.findOne({email:req.user.email})
    const role = ['Seller','admin']
    if(!role.includes(user.role)){
        throw new Error("permission denied: only admin and seller have access to inventory")
    }
    const product = await productModel.product.findOne({
        sku:req.body.productSku,
        sellerId:user._id
    })
    if(!product){
        throw new Error('product not found')
    }
    console.log(req.body)
    const inventory = await inventoryModel.Inventory.findOneAndUpdate(
        {$and: [{invSku:req.body.invSku, productId:product._id}]},
        {
            productId: product._id,
            invSku:req.body.invSku,
            invStockLevel:req.body.invStockLevel,
            price:req.body.price,
            location:req.body.location
        },
        {new:true}
    )

    if(!inventory){
        throw new Error(`${param2} inventory not found`)
    }
    
    return(inventory)
}

exports.deleteInventory = async (req)=>{
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
        throw new Error('product not found')
    }
    const inventory= await inventoryModel.Inventory.findOneAndDelete({
        invSku:param2,
        productId:product._id
    })
    console.log(inventory)
    if(!inventory){
        throw new Error(`inventory not found`)
    }
    return {msg:'successfully deleted'}
}