
import axios from 'axios';

const API_URL = 'https://frutcol-backend.onrender.com/reserprod/'; // Replace with your API URL

// Create a new resource
export const createResource = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/resources`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

// Read all resources
export const getAllResources = async () => {
  try {
    const response = await axios.get(`${API_URL}/resources`);
    return response.data;
  } catch (error) {
    console.error('Error getting all resources:', error);
    throw error;
  }
};

// Read a single resource by ID
export const getResourceById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
  } catch (error) {
    console.error('Error getting resource by ID:', error);
    throw error;
  }
};

// Update a resource by ID
export const updateResourceById = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/resources/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating resource by ID:', error);
    throw error;
  }
};

// Delete a resource by ID
export const deleteResourceById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource by ID:', error);
    throw error;
  }
};
