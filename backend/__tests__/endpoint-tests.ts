import request from 'supertest';
import {app, server} from '../app';
import prisma from '../client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


beforeAll(async () => {
  await prisma.user.deleteMany({});

})

afterAll(async () => {
  await prisma.user.deleteMany({});
  await prisma.$disconnect();
  server.close();
});

const JWT_SECRET: string = process.env.JWT_SECRET as string

let userNoOne:string
let listNoOne:string
let listNoTwo:string
let listItemNoOne:string

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
    userNoOne = response.body.newUser.user_id
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
  it('should get a user by their ID', async () => {
    const response = await request(app)
      .get(`/api/users/${userNoOne}`)
      .expect(200)

      expect(response.body.user.username).toBe('DonnyD')
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
    
    expect(response.body.message).toBe('User cannot be found');
  })
})

describe('Lists - Create and Delete', () => {
  it('Should add a list', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const userData = {
      list_name: 'Shopping List',
      list_desc: 'Supplies for the big night',
      list_cat: 'life'
    }

    const response = await request(app)
      .post(`/api/lists/${userNoOne}`)
      .send(userData)
      .set('Authorization', `Bearer ${token}`)
      .expect(201); 

      listNoOne = response.body.list.list_id

    expect(response.body.list.list_name).toBe('Shopping List');
    expect(response.body.list.list_desc).toBe('Supplies for the big night');
  })

  it('Should add a new list for the next test', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const userData = {
      list_name: 'Black Smith Project',
      list_desc: 'Things to know to get into black smithing',
      list_cat: 'Hobbies'
    }

    const response = await request(app)
      .post(`/api/lists/${userNoOne}`)
      .send(userData)
      .set('Authorization', `Bearer ${token}`)
      .expect(201); 

    listNoTwo = response.body.list.list_id;
  })


  it('Should get all lists for a user', async () => {

    const response = await request(app)
      .get(`/api/lists/all/${userNoOne}`)
      .expect(200); 
    
    expect(response.body.lists.length).toBe(2);
  })

  it('should get a list by its ID along with its todo items', async () => {
    const response = await request(app)
    .get(`/api/lists/${listNoOne}`)
    .expect(200)

    expect(response.body.list.list_name).toBe('Shopping List')
    expect(response.body.listItems.length).toBe(0)
  })

  it('should delete a list by ID', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const response = await request(app)
      .delete(`/api/lists/delete/${listNoTwo}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    expect(response.body.message).toBe("List 'Black Smith Project' successfully deleted.")
  })

})

describe('List Items - Create, Get, and Delete', () => {
  it('Should add an item to a list', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const userData = {
      list_item_desc: 'Cheese',
    }

    const response = await request(app)
      .post(`/api/list-items/new/${listNoOne}`)
      .send(userData)
      .set('Authorization', `Bearer ${token}`)
      .expect(201); 
    listItemNoOne = response.body.listItem.list_item_id;
    expect(response.body.listItem.list_item_desc).toBe('Cheese');
    expect(response.body.listItem.list_id).toBe(listNoOne);
  })

  it('Adding item for next test', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const userData = {
      list_item_desc: 'Butter',
    }

    const response = await request(app)
      .post(`/api/list-items/new/${listNoOne}`)
      .send(userData)
      .set('Authorization', `Bearer ${token}`)
      .expect(201); 
    expect(response.body.listItem.list_item_desc).toBe('Butter');
    expect(response.body.listItem.list_id).toBe(listNoOne);
  })

  it('Should get all lists items for a list', async () => {
    
    const response = await request(app)
      .get(`/api/list-items/${listNoOne}`)
      .expect(200); 
    
    expect(response.body.listItems.length).toBe(2);
  })

  it('should mark a list item as complete', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const response = await request(app)
      .post(`/api/list-items/${listItemNoOne}`)
      .send({
        completed: true
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    expect(response.body.listItem.completed).toBe(true)
  })

  it('should delete a list item by ID', async () => {
    const token = await jwt.sign({email:"donny@nkotb.com"}, JWT_SECRET, {expiresIn:'1h'});

    const response = await request(app)
      .delete(`/api/list-items/delete/${listItemNoOne}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    expect(response.body.message).toBe("List item 'Cheese' successfully deleted.")
  })
})