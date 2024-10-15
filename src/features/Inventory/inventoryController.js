const inventoryService = require('./inventoryService')

exports.addInventory = async (req,res)=>{
    try{
        const inventory = await inventoryService.addInventory(req)
        res.status(201).json(inventory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


exports.getInventory = async (req,res)=>{
    try{
        const inventory = await inventoryService.getInventory(req)
        res.status(200).json(inventory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}


exports.updateInventory = async (req,res)=>{
    try{
        const inventory = await inventoryService.updateInventory(req)
        res.status(200).json(inventory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.deleteInventory = async (req,res)=>{
    try{
        const inventory = await inventoryService.deleteInventory(req)
        res.status(200).json(inventory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}