import axios from 'axios';

const API_URL = 'https://frutcol-backend.onrender.com/carrito/'; // Replace with your API URL

// Create a new item
export const createItem = async (itemData) => {
  try {
    const response = await axios.post(`${API_URL}`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// Read all items
export const getItems = async (token) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
};

// Read a single item by ID
export const getItemById = async (itemId) => {
  try {
    const response = await axios.get(`${API_URL}${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting item:', error);
    throw error;
  }
};

// Update an existing item
export const updateProductFromCart = async (token, id_carrito, id_producto, cantidad_producto) => {
  try {
    const response = await axios.put(`${API_URL}mod`, {
      id_carrito,
      id_producto,
      cantidad_producto
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });    return response;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// Delete an item by ID
export const deleteItem = async (token, id_usuario, id_producto, cantidad_producto) => {
  try {
    const response = await axios.delete(`${API_URL}`, {
        id_usuario,
        id_producto,
        cantidad_producto
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
