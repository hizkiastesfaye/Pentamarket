const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const validMiddleware = require('../../middleware/validMiddleware')
const cartController = require('./cartController')

router.get('/',(req,res)=>{
    res.status(200).send('This Cart feature.')
})

router.post('/add',authMiddleware.jwtVerify,validMiddleware.cartValidate(),cartController.addCart)
router.get('/get/',authMiddleware.jwtVerify,cartController.getCart)
// router.put('/update/:productSku/:invSku',authMiddleware.jwtVerify,validMiddleware.cartValidate(),cartController.updateCart)
router.delete('/delete/:sellerProductId',authMiddleware.jwtVerify,cartController.deleteCart)



module.exports = router;