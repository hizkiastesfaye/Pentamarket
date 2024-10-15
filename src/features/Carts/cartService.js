const userModel = require('../Users/userModel')
const productModel = require('../Products/productModel')
const inventoryModel = require('../Inventory/inventoryModel')
const Cart = require('./cartModel')
const {validationResult} = require('express-validator')

exports.addCart = async (req)=>{

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
    const cart = await Cart.findOne({
        userId: user._id,
        sellerProductId:sellerProduct._id
    })
    console.log(cart)

    if(cart){
        cart.quantity = req.body.quantity || cart.quantity
        cart.status = req.body.status || cart.status

        return (await cart.save())
    }
    const newCart = new Cart({
        userId: user._id,
        sellerProductId:sellerProduct._id,
        quantity: req.body.quantity,
        price: inventory.price,
    })
    // console.log(newCart)
    return(await newCart.save())
}

exports.getCart=async(req)=>{
    const user = await userModel.User.findOne({email:req.user.email})
    const carts = await Cart.find({userId:user._id})
    if(carts.length ==0){
        throw new Error('There is no product in the cart')
    }

    return(carts)
}

exports.deleteCart=async(req)=>{
    const user = await userModel.User.findOne({email:req.user.email})
    const cart = await Cart.findOneAndDelete(
        {$and: [{
            userId:user._id, 
            sellerProductId:req.params.sellerProductId}]
        })
    if (cart.length ==0){
        throw new Error('There is no product in the cart')
    }    
    return({msg:'successfully deleted'})
}


