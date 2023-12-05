import axios from 'axios';

const API_URL = 'https://frutcol-backend.onrender.com/reserva/'; 

// Create a new resource
export const createOrder = async (id_usuario, valor_reserva, num_productos_reserva, fecha_reserva, data) => {
  try {
    const response = await axios.post(`${API_URL}/resources`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;    
  }
};

// Read all resources
export const getOrder = async (token) => {
  try {
    const response = await axios.get(`${API_URL}usuario`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
};

// Read a single resource by ID
export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting resource:', error);
    throw error;
  }
};

// Update a resource by ID
export const updateOrderById = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/resources/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
};

// Delete a resource by ID
export const deleteOrderById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};
