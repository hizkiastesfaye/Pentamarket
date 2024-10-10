const express = require('express')
const router = express.Router()
const productController = require('./productController')
const validMiddleware = require('../../middleware/validMiddleware')
const authMiddleware = require('../../middleware/authMiddleware')

router.get('/',authMiddleware.jwtVerify,(req,res)=>{
    res.status(200).send('This Products feature.')
})

router.post('/catagory/add',authMiddleware.jwtVerify,validMiddleware.productCatagoryValidate(),productController.addCatagory)
router.get('/catagory/get/:name',authMiddleware.jwtVerify,productController.getCatagory)
router.put('/catagory/update/:name',authMiddleware.jwtVerify,validMiddleware.productCatagoryValidate(),productController.updateCatagory)
router.delete('/catagory/delete/:name',authMiddleware.jwtVerify,productController.deleteCatagory)

router.post('/add',authMiddleware.jwtVerify,validMiddleware.productValidate(),productController.addProduct)
router.get('/get/:sku',authMiddleware.jwtVerify,productController.getProduct)
router.put('/update/:sku',authMiddleware.jwtVerify,validMiddleware.productValidate(),productController.updateProduct)
router.delete('/delete/:sku',authMiddleware.jwtVerify,productController.deleteProduct)



module.exports = router;