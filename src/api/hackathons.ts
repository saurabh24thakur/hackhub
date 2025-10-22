
import axios from 'axios';
import { Hackathon } from '../types';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/hackathons';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
};

export const getHackathons = async (): Promise<Hackathon[]> => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const getHackathon = async (id: string): Promise<Hackathon> => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};
