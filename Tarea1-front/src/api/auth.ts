import axios from 'axios';
import type { LoginCredentials, RegisterCredentials } from '../types';


const API_URL = 'http://127.0.0.1:8000'; 

export const registerUser = (credentials: RegisterCredentials) => {
  return axios.post(`${API_URL}/register/`, credentials);
};

export const loginUser = async (credentials: LoginCredentials) => {


  const params = new URLSearchParams();
  
  params.append('username', credentials.username);

  params.append('password', credentials.password);

  const response = await axios.post(`${API_URL}/token`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data;
};