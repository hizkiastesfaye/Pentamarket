const productService = require('./productService')


exports.addCatagory = async (req,res)=>{
    try{
        const catagory = await productService.addCatagory(req)
        res.status(201).json(catagory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.getCatagory = async (req,res)=>{
    try{
        const catagory = await productService.getCatagory(req)
        res.status(200).json(catagory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.updateCatagory = async (req,res)=>{
    try{
        const catagory = await productService.updateCatagory(req)
        res.status(201).json(catagory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.deleteCatagory = async (req,res)=>{
    try{
        const catagory = await productService.deleteCatagory(req)
        res.status(200).json(catagory)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

//Manage Products like add, update, get, delete the product 
exports.addProduct = async (req,res)=>{
    try{
        const product = await productService.addProduct(req)
        res.status(201).json(product)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
exports.getProduct = async (req,res)=>{
    try{
        const product = await productService.getProduct(req)
        res.status(200).json(product)
    }
    catch(err){
        res.status(404).json({error:err.message})
    }
}

exports.updateProduct = async (req,res)=>{
    try{
        const product = await productService.updateProduct(req)
        res.status(201).json(product)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.deleteProduct = async (req,res)=>{
    try{
        const product = await productService.deleteProduct(req)
        res.status(200).json(product)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

