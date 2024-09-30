require('dotenv').config
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3001;
const app = express()

app.use(cors())
app.get('/',(req,res)=>{
    res.send('Welcome to Pentamarkett')
})

app.use((req,res)=>{
    res.status(400).send('400 page not found!')
})

app.listen(port,()=>{
    console.log('connected in http://localhost:3001 ............')
})
