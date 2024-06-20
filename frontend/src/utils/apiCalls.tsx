import axios from 'axios'
import { LogInInputs } from './custom-types';

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

export async function deleteListById(list_id:number) {
  try {
    const response = await instance.delete(`lists/delete/${list_id}`);
    return "List successfully deleted"
  }
  catch(error:any) {
    console.error('Error logging in:', error);
    throw error;
  }
}