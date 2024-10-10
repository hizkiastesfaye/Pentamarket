const app = require('../../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const connectDB = require('../../src/config/dbConfig')
const userModel = require('../../src/features/Users/userModel')
const productModel = require('../../src/features/Products/productModel')

let token = ''
const user01 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'0987654',
    email:'jmark@gmail.com',
    password:'1234567899',
}
const user02 = {
    firstname:'mark',
    email:'jmark@gmail.com',
    password:'1234567899',
}

const prod2 = {
    name:'samsung',
    description:'samsung s9 latest version black',
    sku:'sm-s9-16',
    stockLevel:78,
    email:'jmark@gmail.com',
}
const catag1 = {
    name:'smartPhone',
    description:'phone with touch screen'
}
const catag2 = {
    name:'smartPhone',
    description:'128 GB 6GB memory'
}

beforeAll(async ()=>{
    connectDB()
    const res = await request(app)
    .post('/user/register')
    .send(user01)
    .expect(201)
    // console.log(res.body)

    const res02 = await request(app)
    .post('/user/login')
    .send(user02)
    .expect(200)
    token = res02.body.token
    

})
afterAll(async ()=>{
    await userModel.User.deleteMany()
    await productModel.productCatagory.deleteMany()
    await mongoose.connection.close()
})

describe('test /product/catagory',()=>{
    it('test post /product/catagory/add',async ()=>{
        const res = await request(app)
        .post('/product/catagory/add')
        .set('Authorization', `Bearer ${token}`)
        .send(catag1)
        .expect(201)
        // console.log(res.body)
    })
    it('test get /product/catagory/get', async()=>{
        const res = await request(app)
        .get('/product/catagory/get/smartPhone')
        .set('Authorization',`Bearer ${token}`)
        .expect(200)
        // console.log(res.body)
        
    })
    it('test put /product/catagory/update',async ()=>{
        const res = await request(app)
        .put('/product/catagory/update/smartPhone')
        .set('Authorization',`Bearer ${token}`)
        .send(catag2)
        .expect(201)
        // console.log(res.body)
    })
    it('test delete /product/catagory/delete', async()=>{
        const res = await request(app)
        .delete('/product/catagory/delete/smartPhone')
        .set('Authorization',`Bearer ${token}`)
        .expect(200)
        // console.log(res.body)
        expect(res.body).toEqual({msg:'successfully deleted'})
    })
})


const catag11 = {
    description:'phone with touch screen'
}
const catag12 = {
    name:'smartPhone',
}

describe('test /product/catagory error',()=>{

    it('test post /product/catagory/add',async ()=>{
        const res = await request(app)
        .post('/product/catagory/add')
        .set('Authorization', `Bearer ${token}`)
        .send(catag1)
        .expect(201)
        // console.log(res.body)
    })


    it('test post /product/catagory/add error',async ()=>{
        const res = await request(app)
        .post('/product/catagory/add')
        .send(catag11)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'name is required'})

        const res12 = await request(app)
        .post('/product/catagory/add')
        .send(catag12)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res12.body).toEqual({error:'description is required'})

        const res13= await request(app)
        .post('/product/catagory/add')
        .send(catag1)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        console.log(res13.body)
        expect(res13.body).toEqual({ error: 'The product catagory already exists' })
    })
    it('test get /product/catagory/get error',async()=>{
        const res = await request(app)
        .get('/product/catagory/get/laptop')
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        expect(res.body).toEqual({error:'laptop is not found'})
    })
    it('test put /product/catagory/update error',async()=>{
        const res = await request(app)
        .put('/product/catagory/update/smartPhone')
        .send(catag11)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'name is required'})
    })
    it('test put /product/catagory/update error',async()=>{
        const res1 = await request(app)
        .put('/product/catagory/update/laptop')
        .send(catag1)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        // console.log(res1.body)
        expect(res1.body).toEqual({error:'laptop is not found'})
    })
})
