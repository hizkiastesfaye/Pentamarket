const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.status(200).send('This Orders feature.')
})



module.exports = router;