const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../src/app')
const connectDB = require('../../src/config/dbConfig')
const userModel = require('../../src/features/Users/userModel')
const { updateUser } = require('../../src/features/Users/userService')


let isuser =''
let token = ''
const user1 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'09876543',
    email:'jmark@gmail.com',
}
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
const user2 = {
    firstname:'Derick',
    lastname:'mattiw',
    country: "Germany",
    tel:'0987654',
    email:'derick@gmail.com',
    password:'1234567899',
}
const user3 = {
    firstname:'john',
    lastname:'mike',
    country: "Germany",
    tel:'09876543',
    email:'jmark@gmail.com',
}
const usertel = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'098737412',
    email:'jmark@gmail.com',
}


beforeAll(async()=>{
    await connectDB()
})
beforeEach(async()=>{
    const res = await request(app)
    .post('/user/register')
    .send(user01)
    
    const req1 = await request(app)
    .post('/user/login')
    .send(user02)
    token = req1.body.token

    const upuser = await userModel.User.findOne({firstname:'mark'})
    console.log(upuser,'*******before each**********')
    // isuser = upuser
})
afterEach(async()=>{
    const upduser = await userModel.User.findOne({firstname:'mark'})
    console.log(upduser,'------------after each---------')
    await userModel.User.deleteMany()
})
afterAll(async()=>{
    await mongoose.connection.close()
})

describe('test /user/update',()=>{
    it('test check',async ()=>{
        const res = await request(app)
        .post('/user/update/tel')
        .set('Authorization', `Bearer ${token}`)
        .send(user1)
        // console.log(res.body.lastname)
        expect(res.status).toEqual(201)
        // expect(res.body).toEqual({ email: 'jmark@gmail.com', password: 'asdfghjkl' })

    })
    it('test check',async ()=>{
        const res = await request(app)
        .post('/user/update/firstname/lastname')
        .set('Authorization', `Bearer ${token}`)
        .send(user3)
        console.log(res.body)
        token = res.body
        expect(res.status).toEqual(201)
        // expect(res.body.firstname).toEqual('john')

    })
})


const user11 = {
    lastname:'mattiw',
    tel:'0987654',
    email:'jmark@gmail.com',
}

describe('test /user/update Error',()=>{
    it('test post /user/update Invalid input',async ()=>{
        const res = await request(app)
        .post('/user/update/tel')
        .send(user11)
        .set('authorization', `Bearer ${token}`)
        .expect(400)

        expect(res.body).toEqual({error:'first name is required, country is required'})
    })
})