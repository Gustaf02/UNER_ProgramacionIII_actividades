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
 * 4-A continuación, agrego un nuevo producto (POST) y lo persisto en el archivo local.
 */
async function agregarProducto(nuevoProducto) {
  try {
    const response = await axios.post(`${API_URL}`, nuevoProducto);
    console.log('Producto agregado con éxito:', response.data);

    // Agrego el nuevo producto al archivo local
    let productosExistentes = [];
    if (fs.existsSync('productosJSON.json')) {
      const data = fs.readFileSync('productosJSON.json');
      productosExistentes = JSON.parse(data);
    } 

    // Agregando luego, el producto recién creado
    productosExistentes.push(response.data);

    // Se escribe el array actualizado de vuelta al archivo
    fs.writeFileSync('productosJSON.json', JSON.stringify(productosExistentes, null, 2));
    console.log('Nuevo producto agregado a productosJSON.json');

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
    console.log(`Se busca la información de este producto de acuerdo al ID ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al buscar el producto con ID ${id}:`, error.message);
  }
}

// DECLARACIÓN DEL OBJETO
const nuevoProducto = {
  title: 'Producto nuevo',
  price: 18.5,
  description: 'Este es un producto nuevo diseñado para fines de desarrollo y corroboración de funcionamiento',
  image: 'https://i.pravatar.cc',
  category: 'electronic'
};

//6------------------Eliminar un producto (DELETE).

async function eliminarProducto(id) {

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok){
            throw new Error(`Codigo de error: ${response.status}`);
        }
        const productoEliminado = await response.json();
        console.log(`Producto con id = ${id} eliminado:`,productoEliminado);
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
}


//7------------------Modificar los datos de un producto (UPDATE).

async function modificarProducto(id, datosActualizados) {

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosActualizados)
    });
    if (!response.ok) {
      throw new Error(`Codigo de error: ${response.status}`);
    }
    const productoActualizado = await response.json();
    console.log(`Producto con id = ${id} actualizado:`, productoActualizado);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}


// llamo a las funciones
productos();
productosLimitados(5, 'productosJSON.json');
agregarProducto(nuevoProducto);
buscarProductoPorId(2);
eliminarProducto(1);

const nuevosDatos = {
  "id": 500,
  "title": "Producto actualizado",
  "price": 10000,
  "description": "Soy un producto actualizado",
  "category": "",
  "image": "",
  "rating": {
    "rate": 5,
    "count": 10
  }
}

modificarProducto(3, nuevosDatos);