import request from 'supertest';
import {app, server} from '../app';
import prisma from '../client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


beforeAll(async () => {
  await prisma.user.deleteMany({})
})

afterAll(async () => {
  // Delete all users (or specific data) after tests
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
  server.close();
});

const JWT_SECRET: string = process.env.JWT_SECRET as string

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
    expect(response.body.message).toBe('Successfully registered. Please check email to validate your account')

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

describe('Verify User', () => {
  it('Should activate users profile', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const response = await request(app)
      .get(`/api/users/verify-email?token=${token}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200); 

    expect(response.body.user.validated).toBe(true);
  })

  it('adds user for the next test', async () => {
    const userData = {
      username: 'DonnyD',
      email: 'benny@nkotb.com',
      password: 'passwordABC123',
    };
    
    const newUser = await request(app)
    .post('/api/users/register')
    .send(userData)
    .expect(201);
  })
  it('Should reject a users with missing token', async () => {
    const token = await jwt.sign({email:"benny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});
    
    const response = await request(app)
      .get(`/api/users/verify-email?token=${token}`)
      .expect(401); 
    
      expect(response.body.msg).toBe('Authorization header missing')
  })
})

describe('Login User', () => {
  it('Should login user and issue token', async () => {
    const userData = {
      email: 'donny@nkotb.com',
      password: 'passwordABC123',
    }

    const response = await request(app)
      .post(`/api/users/login`)
      .send(userData)
      .expect(200); 
    expect(response.body.user.username).toBe('DonnyD');
    expect(response.body.user.email).toBe('donny@nkotb.com');
    expect(response.body).toHaveProperty('token');
  })
  it('should reject a login for non-existent email', async () => {
    const userData = {
      email: 'berty@bean.com',
      password: 'passwordABC123',
    }

    const response = await request(app)
      .post(`/api/users/login`)
      .send(userData)
      .expect(404); 
    
    console.log(response.body)
    expect(response.body.message).toBe('User cannot be found');
  })
})