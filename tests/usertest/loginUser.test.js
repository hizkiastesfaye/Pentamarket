const request = require('supertest')
const app = require('../../src/app')
const mongoose = require('mongoose')
const usermodel = require('../../src/features/Users/userModel')


const connectDB = require('../../src/config/dbConfig')

const user1firstname = 'mark'
let token = ''
const user1 = {
    email:'jmark@gmail.com',
    password:'1234567899',
}

const user10 = {
    firstname:'mark',
    lastname:'mattiw',
    tel:'0987654',
    email:'jmark@gmail.com',
    password:'1234567899',
}

beforeAll(async ()=>{
    await connectDB()
})
beforeEach(async()=>{
    const res10 = await request(app)
    .post('/user/register')
    .send(user10)

    const res = await request(app)
    .post('/user/login')
    .send(user1)
    .expect(200)
    token = res.body.token
})
afterEach(async ()=>{
    await usermodel.deleteMany()
})


afterAll(async ()=>{

    await  mongoose.connection.close()

})





describe('test /user/login', ()=>{
    it('test post /user/login',async()=>{
        const res = await request(app)
        .post('/user/login')
        .send(user1)
        .expect(200)
        expect(res.body.firstname).toEqual(user1firstname)
    })

    test('test /user',async ()=>{
        const res = await request(app)
        .get('/user')
        .expect(200)
        expect(res.text).toEqual('This User feature.')
    })
    test('test /user/protectd',async ()=>{
        const res = await request(app)
        .get('/user/protected')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        expect(res.body.msg).toEqual('This is protected url')
    })
})

const user2 = {
    email:'jmark@gmail.com',
}
const user3 = {
    password:'1234567899',
}
const user4 = {
    email:'jmak@gmail.com',
    password:'1234567899',
}
const user5 = {
    email:'jmark@gmail.com',
    password:'123456789',
}

describe('test /user/login Erors',()=>{
    it('test post /user/login Invalid password',async ()=>{
        const res = await request(app)
        .post('/user/login')
        .send(user2)
        .expect(400)
        expect(res.body).toEqual({error:'Password must be at least 8 character long.'})
    })
    it('test post /user/login Invalid email',async ()=>{
        const res1 = await request(app)
        .post('/user/login')
        .send(user3)
        .expect(400)
        expect(res1.body).toEqual({error:'Email is invalid'})
    })
    it('test post /user/login Incorrect email',async ()=>{
        const res1 = await request(app)
        .post('/user/login')
        .send(user4)
        .expect(400)
        expect(res1.body).toEqual({error:'Incorrect Email'})
    })
    it('test post /user/login Incorrect password',async ()=>{
        const res = await request(app)
        .post('/user/login')
        .send(user5)
        .expect(400)
        expect(res.body).toEqual({error:'Incorrect password'})
    })
})