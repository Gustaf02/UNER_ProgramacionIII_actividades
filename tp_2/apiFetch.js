const axios = require('axios');
const fs = require('fs');
const API_URL = 'https://fakestoreapi.com/products';

/**
 * 1-Recuperar la información de todos los productos (GET).
 */
// async function productos() {
//   try {
//     const response = await axios.get(API_URL);
//     console.log('Todos los productos:', response.data);pro
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener productos:', error.message);
//   }
// }

// productos();

/**
 * 2-Recuperar la información de un número limitado de productos (GET).
 */
console.log("=====Recuperar la información de un número limitado de productos (GET)======")
async function productosLimitados(limite, productosJSON) {
  try {
    const response = await axios.get(`${API_URL}?limit=${limite}`);
    console.log(`Primeros ${limite} productos:`, response.data);
    /**
     * 3-Persistir los datos de la consulta anterior en un archivo local JSON.
     */
    const productosJason = response.data;
    fs.writeFileSync(productosJSON, JSON.stringify(productosJason, null, 2));
    console.log(`Productos guardados en ${productosJSON}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos limitados:', error.message);
  }
}

// Ejemplo: Obtenemos 5 productos
productosLimitados(5, 'productosJSON.json');