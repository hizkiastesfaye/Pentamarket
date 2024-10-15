const cartService = require('./cartService')

exports.addCart = async (req,res)=>{
    try{
        const cart = await cartService.addCart(req)
        res.status(201).json(cart)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.getCart = async (req,res)=>{
    try{
        const cart = await cartService.getCart(req)
        res.status(200).json(cart)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


exports.deleteCart = async (req,res)=>{
    try{
        const cart = await cartService.deleteCart(req)
        res.status(200).json(cart)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}