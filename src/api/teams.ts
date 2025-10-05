
import axios from 'axios';
import { Team, User } from '../types';

const API_URL = '/api/teams';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };
};

export const getTeam = async (teamId: string): Promise<Team> => {
    const response = await axios.get(`${API_URL}/${teamId}`, getAuthHeaders());
    return response.data;
};

export const getTeamsByHackathon = async (hackathonId: string): Promise<Team[]> => {
    const response = await axios.get(`${API_URL}?hackathonId=${hackathonId}`, getAuthHeaders());
    return response.data;
};

export const createTeam = async (teamData: Partial<Team>): Promise<Team> => {
    const response = await axios.post(API_URL, teamData, getAuthHeaders());
    return response.data;
};

export const addUserToTeam = async (teamId: string, email: string): Promise<Team> => {
    const response = await axios.put(`${API_URL}/${teamId}/members`, { email }, getAuthHeaders());
    return response.data;
};

export const removeUserFromTeam = async (teamId: string, userId: string): Promise<Team> => {
    const response = await axios.delete(`${API_URL}/${teamId}/members/${userId}`, getAuthHeaders());
    return response.data;
};
