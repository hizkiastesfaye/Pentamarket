const app = require('../../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const connectDB = require('../../src/config/dbConfig')
const userModel = require('../../src/features/Users/userModel')
const productModel = require('../../src/features/Products/productModel')
const inventoryModel = require('../../src/features/Inventory/inventoryModel')


let token = ''
const user01 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'0987654',
    email:'jmark@gmail.com',
    role:'admin',
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
    catagory:'smartPhone'
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
    console.log(res.body)

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
    console.log(res3.body)


    const res4 = await request(app)
    .post('/product/add')
    .set('Authorization', `Bearer ${token}`)
    .send(prod1)
    .expect(201)
    console.log(res4.body)
    

})
afterAll(async ()=>{
    await userModel.User.deleteMany()
    await productModel.product.deleteMany()
    await productModel.productCatagory.deleteMany()
    await inventoryModel.Inventory.deleteMany()
    await inventoryModel.SellerProduct.deleteMany()
    await mongoose.connection.close()
})

const inv1 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:89,
    price:48.98,
    location:'newyork'
}
const inv2 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:700,
    price:408.98,
    location:'florida'
}

describe('test /inventory',()=>{
    test('test first test',async ()=>{
        const res = await request(app)
        .get('/')
        .expect(200)
        expect(res.text).toEqual('Welcome to Pentamarket!')
    })
    it.only('test post /inventory',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv1)
        .set('Authorization',`Bearer ${token}`)
        .expect(201)
        console.log(res.body)

    })
    it.only('test get /inventory',async()=>{
        const res = await request(app)
        .get('/inventory/get/sm-s9-8/sm-s9-8-bl-lg')
        .set('Authorization',`Bearer ${token}`)
        .expect(200)
        console.log(res.body)

        const sellerProduct = await inventoryModel.SellerProduct.findById(res.body.sellerProductId)
        console.log(sellerProduct)
    })
    it('test put /inventory/update',async()=>{
    const res = await request(app)
    .put('/inventory/update/sm-s9-8/sm-s9-8-bl-lg')
    .set('Authorization',`Bearer ${token}`)
    .send(inv2)
    .expect(200)
    console.log(res.body)
    })
    it('test delete /inventory',async()=>{
        const res = await request(app)
        .delete('/inventory/delete/sm-s9-8/sm-s9-8-bl-lg')
        .set('Authorization',`Bearer ${token}`)
        .expect(200)
        expect(res.body).toEqual({msg:'successfully deleted'})
    })

})


const inv10 ={

    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:89,
    price:48.98,
    location:'newyork'
}
const inv12 ={
    productSku: 'sm-s9-8',

    invStockLevel:89,
    price:48.98,
    location:'newyork'
}
const inv13 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',

    price:48.98,
    location:'newyork'
}
const inv14 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:'low',
    price:48.98,
    location:'newyork'
}
const inv15 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:89,

    location:'newyork'
}
const inv16 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:89,
    price:'costy',
    location:'newyork'
}
const inv17 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:89,
    price:48.98,
 
}

const inv18 ={
    productSku: 'sm-s9-17',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:89,
    price:48.98,
    location:'newyork'
}

describe('test post /inventory/add error',()=>{

    it('test post /inventory',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv1)
        .set('Authorization',`Bearer ${token}`)
        .expect(201)
    })

    it('test /post /inventory inventory exists error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .set('Authorization',`Bearer ${token}`)
        .send(inv1)
        .expect(400)
        expect(res.body).toEqual({error:'The inventory already exists'})
    })

    it('test /post /inventory  productSku require error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv10)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'productSku is required'})
    })
    it('test /post /inventory invSku require error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv12)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'invSku is required'})
    })
    it('test /post /inventory invStockLevel required error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv13)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'invStockLevel is required, invStockLevel must be number'} )
    })
    it('test /post /inventory invStockLevel not number error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv14)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'invStockLevel must be number'})
    })
    it('test /post /inventory price require error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv15)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'price is required, price must be number'})
    })
    it('test /post /inventory price not number error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv16)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'price must be number'})
    })
    it('test /post /inventory location required error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv17)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'location is required'})
    })
    it('test /post /inventory/add product not found error',async()=>{
        const res = await request(app)
        .post('/inventory/add')
        .send(inv18)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'product not found'})
    })
})

describe('test get and delete /inventory error',()=>{
    it('test get /inventory param1 productSku error',async()=>{
        const res = await request(app)
        .get('/inventory/get/')
        .set('Authorization',`Bearer ${token}`)
        .expect(404)
        expect(res.body).toEqual({error:'Page not found.'})
    })
    it('test get /inventory param1 productSku error',async()=>{
        const res = await request(app)
        .get('/inventory/get/sm-s9-8/')
        .set('Authorization',`Bearer ${token}`)
        .expect(404)
        expect(res.body).toEqual({error:'Page not found.'})
    })
    it('test get /inventory inventoy not found error',async()=>{
        const res = await request(app)
        .get('/inventory/get/sm-s9-8/sm-s9-8-bll-lg')
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'inventory not found'})
    })   
    it('test get /inventory product not found error',async()=>{
        const res = await request(app)
        .get('/inventory/get/sm-s9-10/sm-s9-8-bl-lg')
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'product not found'})
    })

    it('test delete /inventory inventoy not found error',async()=>{
        const res = await request(app)
        .delete('/inventory/delete/sm-s9-8/sm-s9-8-bll-lg')
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'inventory not found'})
    })
    it('test delete /inventory product not found error',async()=>{
        const res = await request(app)
        .delete('/inventory/delete/sm-s9-10/sm-s9-8-bl-lg')
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res.body).toEqual({error:'product not found'})
    })
    
})