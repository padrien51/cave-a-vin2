import axios from 'axios';

const API_URL = 'http://localhost:4001/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

export const getWines = () => {
  return apiClient.get('/wines');
};

export const addWine = (wineFormData) => {
  return apiClient.post('/wines', wineFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// FONCTION DE SUPPRESSION
export const deleteWine = (id) => {
  return apiClient.delete(`/wines/${id}`);
};