const app = require('../../src/app')
const request = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {MongoMemoryServer} = require('mongodb-memory-server')
const usermodel = require('../../src/features/Users/userModel')
const userService = require('../../src/features/Users/userService')
const connectDB = require('../../src/config/dbConfig')
const gracefulShutdown = require('../../utilities/gracefulShutdown')
let mongoServer;
beforeAll(async ()=>{
    // mongoServer= await MongoMemoryServer.create()
    // const uri = mongoServer.getUri()
    // await mongoose.connect(uri, {
    //     useNewUrlParser:true, 
    //     useUnifiedTopology:true})
    await connectDB()
})
afterEach(async ()=>{
    // await usermodel.deleteMany()
})
afterAll(async ()=>{
    // await mongoose.disconnect()
    // await mongoServer.stop()
   await  mongoose.connection.close()

})

const user = {
    firstname:'john',
    lastname:'biden',
    email:'john@gmail.com',
    password:'1234567899',
}
const user1 = {
    firstname:'mark',
    lastname:'mattiw',
    tel:'0987654',
    email:'jmark@gmail.com',
    password:'1234567899',
}
const user2 = {
    firstname:'john',
    email:'john@gmail.com',
    password:'1234567899',
}
const user3 = {
    firstname:'Derick',
    lastname:'mattiw',
    tel:'0987654',
    email:'derick@gmail.com',
    password:'1234567899',
}
const userincorrectemail = {
    firstname:'kandrik',
    lastname:'mattiw',
    tel:'0987654',
    email:'kandrikgmail.com',
    password:'1234567899',
}
const usernull=null;

describe('Test User', ()=>{



    test('test first test',async ()=>{
        const res = await request(app)
        .get('/')
        .expect(200)
        expect(res.text).toEqual('Welcome to Pentamarket!')
    })

    it('test get /user',async ()=>{
        const res = await request(app)
        .get('/user')
        .expect(200)
        expect(res.text).toEqual('This User feature.')
    })
    it.skip('test post /user/register',async ()=>{

        const res = await request(app)
            .post('/user/register')
            .send(user1)
            .expect(201)
        expect(res.body.firstname).toEqual('mark')

        console.log("in test: ",res.body.password)
        const ismatch = bcrypt.compareSync(user1.password,res.body.password)
        console.log(ismatch)
        user.id = 3
        console.log('res post /user/register:',res.body)
        expect(ismatch).toBe(true)

        const res1 = await request(app)
        .post('/user/register')
        .send(user3)
        .expect(201)
        expect(res1.body.firstname).toEqual('Derick')
    })

})

describe('Test the Errors',()=>{

    it('test /user/register express validation',async()=>{

        const res01 = await request(app)
        .post('/user/register')
        .send(user)
        .expect(400)
        expect(res01.body).toEqual({error:'tel is required'})

        const res02 = await request(app)
        .post('/user/register')
        .send(user2)
        .expect(400)
        expect(res02.body).toEqual({error:'lastname is required, tel is required'})

    })

    it('test post /user/register incorrect form',async ()=>{

        const res0 = await request(app)
        .post('/user/register')
        .send(usernull)
        expect(res0.body).toEqual({error:"first name is required, lastname is required, tel is required, Email is invalid, Password must be at least 8 character long."})

        const res01 = await request(app)
        .post('/user/register')
        .send(userincorrectemail)
        .expect(400)
        expect(res01.body).toEqual({error:'Email is invalid'})

        const res = await request(app)
        .post('/user/register')
        .send(user1)
        expect(res.body).toEqual({error: "Email is already exists"})

        const res1 = await request(app)
        .post('/user/register')
        .send(user)
        .expect(400)
        expect(res1.body).toEqual({error: 'tel is required'})
    })
})







// describe("check the test it's self",()=>{
    // it('test mongodb-memory', async ()=>{
    //     const uu = await usermodel.find()
    //     if (uu) {console.log('uu---------------------',uu) }
    //     const user = await usermodel.create({
    //         firstname:'john',
    //         lastname:'will',
    //         email:'john@gmail.com',
    //         password:'123456789',
    //     })
    //     const uu1 = await usermodel.find()
    //     if (uu1) {console.log('uu---------------------',uu1) }

    //     expect(user.firstname).toBe('john')
    //     expect(user.email).toBe('john@gmail.com')
    // })


    // test('test real mongodb',async ()=>{
    //     const user = await usermodel.create({
    //         firstname:'john',
    //         lastname:'will',
    //         email:'john@gmail.com',
    //         password:'123456789',
    //     })
    //     const uu1 = await usermodel.find()
    //     if (uu1) {console.log('uu---------------------',uu1) }

    //     expect(user.firstname).toBe('john')
    //     expect(user.email).toBe('john@gmail.com')
    // })
// })