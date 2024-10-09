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
    tel:'27432345',
    role:'Seller',
    email:'john@gmail.com',
}

const user4 = {
    firstname:'john',
    lastname:'mike',
    country: "Germany",
    tel:'27432345',
    email:'john@gmail.com',
    password:'1234567899',
    newPassword:'jjsdofjwoenfjj'

}
const usertel = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'098737412',
    email:'jmark@gmail.com',
}


const address01 = {
    state:'New york',
    city:'New york',
    street:'St. Nicholas Avenue',
    zipcode:'10001'

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
    // console.log(upuser,'*******before each**********')
    // isuser = upuser
})
afterEach(async()=>{
    const upduser = await userModel.User.findOne({firstname:'mark'})
    // console.log(upduser,'------------after each---------')
    
    await userModel.User.deleteMany()
    await userModel.Address.deleteMany()
    // await userModel.User.deleteOne({email:'jmark@gmail.com'})
    // await userModel.User.findOneAndDelete({ email: 'jmark@gmail.com' });

})
afterAll(async()=>{
    await mongoose.connection.close()
})

describe('test /user/update and /user/get',()=>{
    it('test check',async ()=>{
        const res = await request(app)
        .put('/user/update/tel')
        .set('Authorization', `Bearer ${token}`)
        .send(user1)
        // console.log(res.body.lastname)
        expect(res.status).toEqual(201)
        // expect(res.body).toEqual({ email: 'jmark@gmail.com', password: 'asdfghjkl' })

    })
    it('test check',async ()=>{
        const res = await request(app)
        .put('/user/update/firstname/lastname')
        .set('Authorization', `Bearer ${token}`)
        .send(user3)
        token = res.body.token
        // console.log(res.body)
        expect(res.status).toEqual(201)
        // expect(res.body.firstname).toEqual('john')

    })
    it('test put /user/update tel',async ()=>{
        const res = await request(app)
        .put('/user/update/tel')
        .send(user3)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
    })
    it('test put /user/update email',async ()=>{
        const res = await request(app)
        .put('/user/update/email')
        .send(user3)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        token = res.body.token
    })
    it('test put /user/update role',async ()=>{
        const res31 = await request(app)
        .put('/user/update/role')
        .send(user3)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        token = res31.body.token
        console.log(res31.body)
    })
    it('test put user/update password',async ()=>{
        const res = await request(app)
        .put('/user/update/password')
        .send(user4)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        // console.log('res.body',res.body)
    })
    it('test /put user/update/address',async()=>{
        const res = await request(app)
        .put('/user/update/address')
        .send(address01)
        .set('Authorization',`Bearer ${token}`)
        .expect(201)
    })

    it('test /get user/get',async ()=>{
        const res = await request(app)
        .get('/user/get')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        expect(res.body).toEqual({
            firstname: 'mark',
            lastname: 'mattiw',
            country: 'Germany',
            tel: '0987654',
            email: 'jmark@gmail.com',
            role: 'Buyer'
          })
    })
    it('test delete /user/delete',async()=>{
        await request(app)
        .put('/user/update/address')
        .send(address01)
        .set('Authorization',`Bearer ${token}`)


        const res = await request(app)
        .delete('/user/delete/jmark@gmail.com')
        .set('Authorization',`Bearer ${token}`)
        .expect(204)
    })
    it('test delete /user/delete',async()=>{

        const res = await request(app)
        .delete('/user/delete/jmark@gmail.com')
        .set('Authorization',`Bearer ${token}`)
        .expect(204)
    })
})


const user11 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    email:'jmark@gmail.com',
}
const user12 = {
    lastname:'mattiw',
    country: "Germany",
    tel:'098737412',
    email:'jmark@gmail.com',
}
const user13 = {
    firstname:'mark',
    country: "Germany",
    tel:'098737412',
    email:'jmark@gmail.com',
}
const user14 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'098737412',
}
const user15 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'098737412',
    email:'jmark@gmail.com',

}
const user16 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'098737412',
    email:'jmark@gmail.com',

}
const user17 = {
    firstname:'mark',
    lastname:'mattiw',
    country: "Germany",
    tel:'098737412',
    email:'jmark@gmail.com',

}

describe('test /user/update Error',()=>{
    it('test put /user/update Invalid input',async ()=>{
        const res1 = await request(app)
        .put('/user/update/tel')
        .send(user11)
        .set('authorization', `Bearer ${token}`)
        .expect(400)
        expect(res1.body).toEqual({error:'tel is required'})
    })
    it('test put /user/update Invalid te',async ()=>{
        const res2 = await request(app)
        .put('/user/update/firstname/lastname')
        .send(user12)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res2.body).toEqual({error:'firstname is required'})



        const res3 = await request(app)
        .put('/user/update/firstname/lastname')
        .send(user13)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res3.body).toEqual({error:'lastname is required'})


        const res4= await request(app)
        .put('/user/update/email')
        .send(user14)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res4.body).toEqual({error:'Email is invalid'})


        const res5= await request(app)
        .put('/user/update/lastname')
        .send(user15)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res5.body).toEqual({error:'Invalid field'})

        const res6 = await request(app)
        .put('/user/update/firstname')
        .send(user16)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res6.body).toEqual({error:'field2 is required after firstname'})

        const res7 = await request(app)
        .put('/user/update/tel/lastname')
        .send(user16)
        .set('Authorization',`Bearer ${token}`)
        .expect(400)
        expect(res7.body).toEqual({error:'field1 should be firstname before lastname field'})
        
    })
})