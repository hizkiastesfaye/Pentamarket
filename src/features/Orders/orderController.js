const orderService = require('./orderService')

exports.addOrder = async (req,res)=>{
    try{
        const order = await orderService.addOrder(req)
        res.status(201).json(order)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.getOrder = async (req,res)=>{
    try{
        const order = await orderService.getOrder(req)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


exports.deleteorder = async (req,res)=>{
    try{
        const order = await orderService.deleteorder(req)
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}