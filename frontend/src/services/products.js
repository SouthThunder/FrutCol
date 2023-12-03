import axios from 'axios';

const API_URL = 'https://frutcol-backend.onrender.com'; // Replace with your API URL

// Create a new item
export const createProduct = async (ProductData) => {
  try {
    const response = await axios.post(`${API_URL}/metadata`, ProductData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Read all items
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/metadata`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
};

// Read a single item by ID
export const getProductById = async (ProductId) => {
  try {
    const response = await axios.get(`${API_URL}/metadata/${ProductId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting item:', error);
    throw error;
  }
};

// Update an existing item
export const updateProduct = async (ProductId, ProductData) => {
  try {
    const response = await axios.put(`${API_URL}/metadata/${ProductId}`, ProductData);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// Delete an item by ID
export const deleteProduct = async (ProductId) => {
  try {
    const response = await axios.delete(`${API_URL}/metadata/${ProductId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
