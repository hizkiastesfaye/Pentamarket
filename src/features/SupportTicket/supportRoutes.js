const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.status(200).send('This Support Ticket feature.')
})



module.exports = router;