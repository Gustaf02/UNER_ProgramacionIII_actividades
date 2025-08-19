const axios = require('axios');
const fs = require('fs');
const API_URL = 'https://fakestoreapi.com/products';

/**
 * 1-Recuperar la información de todos los productos (GET).
 */
async function productos() {
  try {
    const response = await axios.get(API_URL);
    console.log('Todos los productos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
  }
}

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

/**
 * 4-Agrego un nuevo producto (POST).
 */
async function agregarProducto() {
  const nuevoProducto = {
    title: 'Producto nuevo',
    price: 18.5,
    description: 'Este es un producto nuevo diseñado para fines de desarrollo y corroboración de funcionamiento',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
  };

  try {
    const response = await axios.post(`${API_URL}`, nuevoProducto);
    console.log('Producto agregado con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al agregar el producto:', error.message);
  }
}

/**
 * 5-Buscar la información de un determinado producto, utilizando un "id" como parámetro (GET).
 */
async function buscarProductoPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(`Se buca la información de este producto de acuerdo al ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al buscar el producto con ID ${id}:`, error.message);
  }
}

// llamo a las funciones
productos();
productosLimitados(5, 'productosJSON.json');
agregarProducto();
buscarProductoPorId(2);
