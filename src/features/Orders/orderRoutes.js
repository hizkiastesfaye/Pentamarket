const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')
const validMiddleware = require('../../middleware/validMiddleware')
const orderController = require('./orderController')

router.get('/',(req,res)=>{
    res.status(200).send('This Orders feature.')
})
router.post('/add',authMiddleware.jwtVerify,validMiddleware.orderValidate(),orderController.addOrder)
router.get('/get/',authMiddleware.jwtVerify,orderController.getOrder)
router.put('/update/:orderId',authMiddleware.jwtVerify,validMiddleware.updateOrderValidate(),orderController.updateOrder)
router.delete('/delete/:orderId',authMiddleware.jwtVerify,orderController.deleteOrder)


module.exports = router;