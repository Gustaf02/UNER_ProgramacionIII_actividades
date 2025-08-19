const axios = require('axios');

const API_URL = 'https://fakestoreapi.com/products';

async function productos() {
  try {
    const response = await axios.get(API_URL);
    console.log('Todos los productos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
  }
}

productos();