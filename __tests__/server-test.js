'use strict';

require('@code-fellows/supergoose');
const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);
let documentId;

describe('Testing aunthenication server routes', () => {
  it('Should create a new user on POST /signup', async () => {
    const response = await request.post('/signup').send({
      username: 'bob',
      password: 'testpilot',
    });
    documentId = response.body._id;
    

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeTruthy();
    expect(response.body.username).toEqual('bob');
  });

  it('Should login as an existing user on POST /signin', async () => {
    const response = await request.post(`/signin`).set({ Authorization: 'Basic Ym9iOnRlc3RwaWxvdA==' });

    expect(response.status).toEqual(200);
    expect(response.body.user._id).toEqual(documentId);
    expect(response.body.user.username).toEqual('bob');
  });

  // it('Should trigger an error handler "Invalid Login" on any error', async () => {
  //   const response = await request.post(`/signin`).set({ Authorization: 'Basic c2FtOnRlc3RwaWxvdA==' });

  //   expect(response.status).toEqual(401);
  // });

});