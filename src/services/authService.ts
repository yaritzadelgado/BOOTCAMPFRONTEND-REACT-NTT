import axios from 'axios';

const API_URL = 'https://dummyjson.com/auth/login';

interface LoginResponse {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  token: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL, { username, password });
    
   
    const { token, username: user } = response.data;
    localStorage.setItem('accessToken', token);  
    localStorage.setItem('username', user);      

    return response.data; 
  } catch (error: any) {
    throw new Error('Usuario o contraseña incorrectos.');
  }
};
