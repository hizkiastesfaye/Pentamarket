const app = require('../src/app')
const request = require('supertest')

test('test first test',async ()=>{
    const res = await request(app)
    .get('/')
    .expect(200)
    expect(res.text).toEqual('Welcome to Pentamarket!')
})