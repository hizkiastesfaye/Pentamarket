const Order = require('./orderModel')
const productModel = require('../Products/productModel')
const inventoryModel = require('../Inventory/inventoryModel')
const userModel = require('../Users/userModel')
const {validationResult} = require('express-validator')


exports.addOrder= async(req)=>{
    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessages)
    }

    const user = await userModel.User.findOne({email:req.user.email})
    const sellerProduct = await inventoryModel.SellerProduct.findById(req.body.sellerProductId)
    if(!sellerProduct){
        throw new Error('sellerProduct not found')
    }
    const seller = await userModel.User.findById(sellerProduct.sellerId)
    if(!seller){
        throw new Error('seller not found')
    }
    const product = await productModel.product.findById(sellerProduct.productId)
    if(!product){
        throw new Error('product not found')
    }
    const inventory = await inventoryModel.Inventory.findById(sellerProduct.inventoryId)
    if(!inventory){
        throw new Error('inventory not found')
    }
    if(inventory.invStockLevel < req.body.quantity){
        throw new Error(`The quantity must be lessthan ${inventory.invStockLevel}`)
    }
    console.log(req.body.quantity)
    const newOrder = new Order({
        userId:user._id,
        sellerId:seller._id,
        productId:product._id,
        inventoryId: inventory._id,
        quantity:req.body.quantity,
        price:inventory.price,
    })
    await newOrder.save()
    inventory.invStockLevel -= req.body.quantity
    await inventory.save()
    return(newOrder)
}

exports.updateOrder = async(req)=>{
    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessages)
    }

    const user = await userModel.User.findOne({email:req.user.email})
    const order1 = await Order.findById(req.params.orderId)
    if(!order1){
        throw new Error('order not found')
    }
    const seller = await userModel.User.findById(order1.sellerId)
    if(!seller){
        throw new Error('seller not found')
    }
    const product = await productModel.product.findById(order1.productId)
    if(!product){
        throw new Error('product not found')
    }
    const inventory = await inventoryModel.Inventory.findById(order1.inventoryId)
    if(!inventory){
        throw new Error('inventory not found')
    }
    if((inventory.invStockLevel + order1.quantity) < req.body.quantity){
        throw new Error(`The quantity must be lessthan ${inventory.invStockLevel}`)
    }

    const status = ['processing','shipped','delivered','cancelled','failed','returned','refunded']
    if (!status.includes(order1.status)){
        throw new Error('order is already reserved')
    }
    order1.quantity = req.body.quantity
    inventory.invStockLevel = (inventory.invStockLevel + order1.quantity)-req.body.quantity
    await order1.save()
    await inventory.save()
    return(order1)
}
exports.getOrder=async (req)=>{
    const user = await userModel.User.findOne({email:req.user.email})
    const order1 = Order.findOne({userId:user._id})
    if(!order1){
        throw new Error('order not found')
    }
    return(order1)
}

exports.deleteOrder= async (req)=>{
    const user = await userModel.User.findOne({email:req.user.email})
    const order1 = Order.findOneAndDelete({_id:req.params.orderId})
    if(order1){
        throw new Error('order not found')
    }
    return({msg:'order deleted succfully'})
}