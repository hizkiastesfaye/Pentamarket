const express = require('express')
const router = express.Router()
const inventoryController = require('./inventoryController')
const authMiddleware = require('../../middleware/authMiddleware')
const validMiddleware = require('../../middleware/validMiddleware')

router.get('/',(req,res)=>{
    res.status(200).send('This Inventory feature.')
})
router.post('/add',authMiddleware.jwtVerify,validMiddleware.addInventoryValidate(),inventoryController.addInventory)
router.get('/get/:productSku/:invSku',authMiddleware.jwtVerify,inventoryController.getInventory)
router.put('/update/:productSku/:invSku',authMiddleware.jwtVerify,validMiddleware.updateInventoryValidate(),inventoryController.updateInventory)
router.delete('/delete/:productSku/:invSku',authMiddleware.jwtVerify,inventoryController.deleteInventory)




module.exports = router;