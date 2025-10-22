
import axios from 'axios';
import { User } from '../types';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/auth';

export const login = async (credentials: any): Promise<{ token: string; user: User }> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const register = async (userData: any): Promise<{ token: string; user: User }> => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const getMe = async (token: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};
