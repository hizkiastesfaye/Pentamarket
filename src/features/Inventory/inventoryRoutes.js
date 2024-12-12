const express = require('express')
const router = express.Router()
const fs = require('fs')
const path= require('path')
const inventoryController = require('./inventoryController')
const authMiddleware = require('../../middleware/authMiddleware')
const validMiddleware = require('../../middleware/validMiddleware')
const multer = require('multer');


// const storage = multer.memoryStorage(); // Store files in memory as buffers
// const upload = multer({ dest: "uploads/" })
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // The folder where images will be saved
    },
    filename: (req, file, cb) => {
        const {invSku} = req.body
        const firstname = req.user.firstname
        cb(null, `${firstname}_${invSku}_${Date.now()}${path.extname(file.originalname)}`); // To ensure unique filenames
        
    },
});

const upload = multer({ storage:storage });



router.get('/',(req,res)=>{
    res.status(200).send('This Inventory feature.')
})
router.post('/add',authMiddleware.jwtVerify,upload.single('image'),validMiddleware.addInventoryValidate(),inventoryController.addInventory)
router.get('/get/:productSku/:invSku',authMiddleware.jwtVerify,inventoryController.getInventory)
router.put('/update/:productSku/:invSku',authMiddleware.jwtVerify,validMiddleware.updateInventoryValidate(),inventoryController.updateInventory)
router.delete('/delete/:productSku/:invSku',authMiddleware.jwtVerify,inventoryController.deleteInventory)




module.exports = router;