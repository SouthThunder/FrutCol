
import axios from 'axios';

const API_URL = 'https://frutcol-backend.onrender.com/facturacion/';

// Create a new receipt
export const createReceipt = async (receiptData) => {
  try {
    const response = await axios.post(API_URL, receiptData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get all receipts
export const getReceipts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get a single receipt by ID
export const getReceiptById = async (receiptId, token) => {
  try {
    const response = await axios.get(`${API_URL}${receiptId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update a receipt by ID
export const updateReceipt = async (receiptId, receiptData) => {
  try {
    const response = await axios.put(`${API_URL}/${receiptId}`, receiptData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Delete a receipt by ID
export const deleteReceipt = async (receiptId) => {
  try {
    const response = await axios.delete(`${API_URL}/${receiptId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
