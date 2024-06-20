import axios from 'axios'
import { LogInInputs, NewListInput, RegistrationInputs } from './custom-types';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export async function logUserIn(body: LogInInputs) {
  try {
    const response = await instance.post('users/login', body);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function getUserLists(user_id: number) {
  try {
    const response = await instance.get(`lists/all/${user_id}`);
    return response.data;
  } catch (error:any) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function deleteListById(list_id:number, token: string|null) {
    const response = await instance.delete(`lists/delete/${list_id}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }});
    return response
}

export async function registerUser(body: RegistrationInputs) {
  try {
    const response = await instance.post('users/register', body)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function validateUser(token:string) {
  try {
    const response = await instance.get(`users/verify-email?token=${token}`);
    return response.data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function createNewList(body: NewListInput, user_id: number, token:string|null) {
  try {
    const response = await instance.post(`lists/${user_id}`, body, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }}
    );
    return response.data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function getListById(list_id:number) {
  try {
    const response = await instance.get(`lists/${list_id}`);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  } 
}