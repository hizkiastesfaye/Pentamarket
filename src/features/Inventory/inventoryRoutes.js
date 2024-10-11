const express = require('express')
const router = express.Router()
const inventoryController = require('./inventoryController')
const authMiddleware = require('../../middleware/authMiddleware')
const validMiddleware = require('../../middleware/validMiddleware')

router.get('/',(req,res)=>{
    res.status(200).send('This Inventory feature.')
})
router.post('/add',authMiddleware.jwtVerify,validMiddleware.addInventoryValidate(),inventoryController.addInventory)
router.get('/get/:productSku/:invSku',authMiddleware.jwtVerify,validMiddleware.getAndDeleteInventoryValidate(),inventoryController.getInventory)

module.exports = router;