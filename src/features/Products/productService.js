const productModel = require('./productModel')
const userModel = require('../Users/userModel')
const {validationResult} = require('express-validator')

exports.addCatagory = async (req)=>{
    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessages)
    }
    const catagory = await productModel.productCatagory.findOne({name:req.body.name})
    if(catagory){
        throw new Error('The product catagory already exists')
    }
    const user = await userModel.User.findOne({email:req.user.email})
    if(user.role != 'admin'){
        throw new Error("permission denied: only admin have access to catagory")
    }
    const newcatagory = new productModel.productCatagory({
        name:req.body.name,
        description:req.body.description
    })
    // console.log(newcatagory)
    return(await newcatagory.save())
}

exports.getCatagory = async (req)=>{
    const user = await userModel.User.findOne({email:req.user.email})
    
    const role = ['Seller','admin']
    if(!role.includes(user.role)){
        console.log(!role.includes(user.role))
        throw new Error("permission denied: only admin and seller to get catagory")
    }

    const catagory = await productModel.productCatagory.findOne({name:req.params.name})
    if(!catagory){
        throw new Error(`${req.params.name} is not found`)
    }
    return {
        name:catagory.name,
        description:catagory.description
    }
}
exports.updateCatagory = async(req)=>{
    const err = validationResult(req)
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessages)
    }

    const user = await userModel.User.findOne({email:req.user.email})
    if(user.role != 'admin'){
        throw new Error("permission denied: only admin have access to catagory")
    }

    const catagory = await productModel.productCatagory.findOneAndUpdate(
        {name:req.params.name},
        {name:req.body.name,description:req.body.description},
        {new:true}
    )
    if(!catagory){
        throw new Error(`${req.params.name} is not found`)
    }
    
    return catagory
}

exports.deleteCatagory = async (req)=>{
    const user = await userModel.User.findOne({email:req.user.email})
    if(user.role != 'admin'){
        throw new Error("permission denied: only admin have access to catagory")
    }
    const catagory = await productModel.productCatagory.findOneAndDelete({name:req.params.name})
    if(!catagory){
        throw new Error(`${req.params.name} is not found`)
    }

    return {msg:'successfully deleted'}
}




exports.addProduct = async (req)=>{
    const err = validationResult(req)
    if(!err.isEmpty()){
        const errorMessage= err.array().map(error=>error.msg).join(' ')
        throw new Error(errorMessage)
    }
    const seller = await userModel.User.findOne({email:req.user.email})
    if(!seller){
        throw new Error('seller not found')
    }
    const role = ['Seller','admin']
    if(!role.includes(seller.role)){
        throw new Error("permission denied: Buyer can't add product")
    }
    const catagory = await productModel.productCatagory.findOne({name:req.body.catagory})
    if(!catagory){
        throw new Error('catagory not found')
    }
    const product = new productModel.product({
        name:req.body.name,
        catagoryId: catagory._id,
        sellerId: seller._id,
        sku:req.body.sku,
        stockLevel:req.body.stockLevel,
        description:req.body.description
    })
    return(await product.save())
}

exports.getProduct = async (req)=>{
    const user = await userModel.User.findOne({email:req.user.email})
    const product = await productModel.product.findOne({
        sku:req.params.sku,
        sellerId:user._id

    })
    if(!product){
        throw new Error(`${req.params.sku} is not found`)
    }
    const catagory = await productModel.productCatagory.findOne({_id:product.catagoryId})
    return {
        name:product.name,
        catagory:catagory.name,
        sku:product.sku,
        stockLevel:product.stockLevel,
        description:product.description
    }
}

exports.updateProduct = async(req)=>{

    const err = validationResult(req)
    
    if (!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(' ')
        console.log(errorMessages)
        throw new Error(errorMessages)
    }
    const seller = await userModel.User.findOne({email:req.user.email})
    const role = ['Seller','admin']
    if(!role.includes(seller.role)){
        throw new Error("permission denied: Buyer can't add product")
    }
    const product = await productModel.product.findOneAndUpdate(
        {$and: [{sku:req.params.sku},{sellerId:seller._id}]},
        {
            name:req.body.name,
            sku:req.body.sku,
            stockLevel:req.body.stockLevel,
            description:req.body.description
        },
        {new:true}
    )
    console.log(product)
    
    if(!product){
        throw new Error(`${req.params.sku} is not found`)
    }
    return product
}


exports.deleteProduct = async (req)=>{

    const seller = await userModel.User.findOne({email:req.user.email})
    const role = ['Seller','admin']
    if(!role.includes(seller.role)){
        throw new Error("permission denied: Buyer can't add product")
    }
    const catagory = await productModel.productCatagory.deleteOne({
        sku:req.params.sku,
        sellerId: seller._id
    })
    if(!catagory){
        throw new Error(`${req.params.sku} is not found`)
    }
    return {msg:'successfully deleted'}
}