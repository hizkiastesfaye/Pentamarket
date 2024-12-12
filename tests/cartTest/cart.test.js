const app = require('../../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const connectDB = require('../../src/config/dbConfig')
const userModel = require('../../src/features/Users/userModel')
const productModel = require('../../src/features/Products/productModel')
const inventoryModel = require('../../src/features/Inventory/inventoryModel')
const Cart = require('../../src/features/Carts/cartModel')

let token = ''
let sellerProductId = ''
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

const inv1 ={
    productSku: 'sm-s9-8',
    invSku: 'sm-s9-8-bl-lg',
    invStockLevel:89,
    price:48.98,
    location:'newyork'
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

    const res5 = await request(app)
    .post('/inventory/add')
    .send(inv1)
    .set('Authorization',`Bearer ${token}`)
    .expect(201)

    const res6 = await request(app)
    .get('/inventory/get/sm-s9-8/sm-s9-8-bl-lg')
    .set('Authorization',`Bearer ${token}`)
    .expect(200)
    console.log(res6.body)
    sellerProductId = res6.body.sellerProductId

})
afterAll(async ()=>{
    await userModel.User.deleteMany()
    await productModel.product.deleteMany()
    await productModel.productCatagory.deleteMany()
    await inventoryModel.Inventory.deleteMany()
    await inventoryModel.SellerProduct.deleteMany()
    await Cart.deleteMany()
    await mongoose.connection.close()
})


describe('test /cart',()=>{

    it.only('test get /cart',async()=>{
        const res = await request(app)
        .get('/cart')
        .set('Authorization', `${token}`)
        .expect(200)
    })

    it('test post /cart/add',async()=>{
        const cart1 = {
            quantity:40,
            sellerProductId:sellerProductId
        }

        const res = await request(app)
        .post('/cart/add')
        .set('Authorization', `Bearer ${token}`)
        .send(cart1)
        .expect(400)
        console.log(res.body)
    })
    it('test post /cart/add',async()=>{
        const cart1 = {
            quantity:20,
            sellerProductId:sellerProductId
        }

        const res = await request(app)
        .post('/cart/add')
        .set('Authorization', `Bearer ${token}`)
        .send(cart1)
        .expect(201)
        console.log(res.body)
    })
    it('test get /cart/get ',async ()=>{
        const res = await request(app)
        .get('/cart/get')
        .set('Authorization',`Bearer ${token}`)
        .expect(200)
        console.log(res.body)
    })
    it('test get /cart/get ',async ()=>{
        console.log(sellerProductId)
        
        const res = await request(app)
        .delete(`/cart/delete/${sellerProductId}`)
        .set('Authorization',`Bearer ${token}`)
        .expect(200)
        console.log(res.body)
    })
})