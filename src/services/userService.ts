
import axios from 'axios';

const API_URL = '/api/users';

export const getUsers = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const updateUserRole = async (token: string, userId: string, role: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${userId}/role`, { role }, config);
  return response.data;
};
