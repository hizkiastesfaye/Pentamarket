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
    email:'jmark@gmail.com',
    password:'1234567899',
}

const prod1 = {
    name:'samsung',
    description:'black medium size phone',
    sku:'sm-s9-8',
    stockLevel:90,
}
const prod2 = {
    name:'samsung',
    description:'samsung s9 latest version black',
    sku:'sm-s9-16',
    stockLevel:78,
}
const catag1 = {
    name:'smartPhone',
    description:'phone with touch screen'
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

    const res3 = await request(app)
    .post('/product/catagory/add')
    .set('Authorization', `Bearer ${token}`)
    .send(catag1)
    .expect(201)
    // console.log(res3.body)
    

})
afterAll(async ()=>{
    await userModel.User.deleteMany()
    await productModel.product.deleteMany()
    await productModel.productCatagory.deleteMany()
    await mongoose.connection.close()
})


describe('test /product',()=>{
    it('test first test',async ()=>{
        const res = await request(app)
        .get('/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        expect(res.text).toEqual('Welcome to Pentamarket!')
    })

    it('test post /product/add',async ()=>{
        const res = await request(app)
        .post('/product/add')
        .set('Authorization', `Bearer ${token}`)
        .send(prod1)
        .expect(201)
        // console.log(res.body)
        // expect(res.body).toEqual(prod1)

    })
    it('test put /product/update',async()=>{
        const res = await request(app)
        .put('/product/update/sm-s9-8')
        .set('Authorization', `Bearer ${token}`)
        .send(prod2)
        // .expect(201)
        console.log(res.body)

    })
    it('test delete /product/delete',async()=>{
        const res = await request(app)
        .delete('/product/delete/sm-s9-8')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        expect(res.body).toEqual({msg:'successfully deleted'})

    })
})
const catag11 = {
    description:'phone with touch screen'
}
const catag12 = {
    name:'smartPhone',
}


const prod21 = {
    description:'black medium size phone',
    sku:'sm-s9-8',
    stockLevel:90,
}
const prod22 = {
    name:'samsung',
    sku:'sm-s9-8',
    stockLevel:90,
}
const prod23 = {
    name:'samsung',
    description:'black medium size phone',
    stockLevel:90,
}
const prod24 = {
    name:'samsung',
    description:'black medium size phone',
    sku:'sm-s9-8',
}
const prod25 = {
    name:'samsung',
    description:'black medium size phone',
    sku:'sm-s9-8',
    stockLevel:'high',
}
const prod26 = {
    name:'samsung',
    description:'black medium size phone',
    sku:'sm-s9-32',
    stockLevel:90,
}
describe('test /product error',()=>{
    it('test post /product/add name is required',async ()=>{
        const res = await request(app)
        .post('/product/add')
        .send(prod21)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'name is required'})
    })
    it('test post /product/add description error',async ()=>{
        const res = await request(app)
        .post('/product/add')
        .send(prod22)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'description is required'})
    })
    it('test post /product/add sku is required',async ()=>{
        const res = await request(app)
        .post('/product/add')
        .send(prod23)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'sku is required'})
    })
    it('test post /product/add stockLevel is required',async ()=>{
        const res = await request(app)
        .post('/product/add')
        .send(prod24)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:"stockLevel is required stockLevel must be number"})
    })
    it('test post /product/add stockLevel must be number',async ()=>{
        const res = await request(app)
        .post('/product/add')
        .send(prod25)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:"stockLevel must be number"})
    })

    it('test put /product/update field required',async()=>{
        const res = await request(app)
        .put('/product/update/sm-s9-32')
        .send(prod26)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'sm-s9-32 is not found'})
    })

    it('test put /product/update page not found error',async()=>{
        const res = await request(app)
        .put('/product/update')
        .send(prod24)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
        expect(res.body).toEqual({error:'Page not found.'})
    })


    
})