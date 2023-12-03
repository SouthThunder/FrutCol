import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = 'https://frutcol-backend.onrender.com/usuarios/';

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const authToken = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response;
      }
      catch (error) {
        Cookie.remove('token');
        console.error('Error:', error);
      }
}

// Read all users
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Read a single user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update a user by ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
