import request from 'supertest';
import {app, server} from '../app';
import prisma from '../client';
import bcrypt from 'bcryptjs'

beforeAll(async () => {
  await prisma.user.deleteMany({})
})

afterAll(async () => {
  // Delete all users (or specific data) after tests
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
  server.close();
});


describe('Post User', () => {
  it('should post a new user', async () => {
    const userData = {
      username: 'DonnyD',
      email: 'donny@nkotb.com',
      password: 'passwordABC123',
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(201); 

    expect(response.body.newUser).toHaveProperty('user_id'); // Check for generated ID
    expect(response.body.newUser.username).toBe(userData.username);
    expect(response.body.newUser.email).toBe(userData.email);
    expect(response.body.newUser.validated).toBe(false);

    const passwordMatch = await bcrypt.compare('passwordABC123', response.body.newUser.password)
    expect(passwordMatch).toBe(true)
  })
  it('should reject a user with an invalid email', async () => {
    const userData = {
      username: 'DonnyD',
      email: 'donnyATnkotbcom',
      password: 'passwordABC123',
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(400); 

    expect(response.body.details[0].message).toBe('email is Invalid email');
  })

  it('reject a registration with missing data', async () => {
    const userData = {
      email: 'donny@nkotb.com',
      password: 'passwordABC123',
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(400); 

      expect(response.body.details[0].message).toBe('username is Required');
  })
  it('should reject registration for duplicate email', async () => {
    const userData = {
      username: 'DonnyD',
      email: 'donny@nkotb.com',
      password: 'passwordABC123',
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(400); 
  
    expect(response.body.message).toBe('Email already exists. Please sign in.'); // Check for generated ID
  })
})