const fs = require('fs').promises;
const API_URL = 'https://fakestoreapi.com/products';

/**
 * 1-Recuperar la información de todos los productos (GET).
 */
async function todosProductos() {

    try {
        const response = await fetch(API_URL);
        if (!response.ok){
            throw new Error(`Codigo de error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Todos los productos: ',data);
        return data;

    }catch(error){
        console.error(`Error: ${error}`);
    }
}

/**
 * 2-Recuperar la información de un número limitado de productos (GET).
 */
async function productosLimitados(cantidad) {

    try {
        const response = await fetch(`${API_URL}?limit=${cantidad}`);
        if (!response.ok){
            throw new Error(`Codigo de error: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Productos limitados (${cantidad}): `, data);
        return data;

    }catch(error){
        console.error(`Error: ${error}`);
    }
}

/**
   * 3-Persistir los datos de la consulta anterior en un archivo local JSON.
   */
async function persistirProductosLimitados(cantidad, nombreArchivo) {

    try {
        const response = await fetch(`${API_URL}?limit=${cantidad}`);
        if (!response.ok){
            throw new Error(`Codigo de error: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Productos limitados (${cantidad}) grabados en ${nombreArchivo}: `, data);

        await fs.writeFile(nombreArchivo, JSON.stringify(data, null, 2), 'utf-8');
        return data;

    }catch(error){
        console.error(`Error: ${error}`);
    }
}

/**
 * 4- A continuación, agrego un nuevo producto (POST) y lo persisto en el archivo local.
 */

// DECLARACIÓN DEL OBJETO
const nuevoProducto = {
    title: 'Producto nuevo',
    price: 18.5,
    description: 'Este es un producto nuevo diseñado para fines de desarrollo y corroboración de funcionamiento',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
};

async function agregarProducto(nuevoProducto) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });
        if (!response.ok) {
            throw new Error(`Código de error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Producto agregado con éxito:', data);

        // Agrego el nuevo producto al archivo local
        let productosExistentes = [];
        try {
            const fileData = await fs.readFile('productosJSON.json', 'utf-8');
            productosExistentes = JSON.parse(fileData);
        } catch (readError) {
            // Si el archivo no existe o hay un error de lectura, se crea un array vacío
            if (readError.code !== 'ENOENT') {
                console.error('Error al leer el archivo:', readError);
            }
        }

        // Agregando luego, el producto recién creado
        productosExistentes.push(data);

        // Se escribe el array actualizado de vuelta al archivo
        await fs.writeFile('productosJSON.json', JSON.stringify(productosExistentes, null, 2));
        console.log('Nuevo producto agregado a productosJSON.json');

        return data;
    } catch (error) {
        console.error('Error al agregar el producto:', error.message);
    }
}

/**
 * 5-Buscar la información de un determinado producto, utilizando un "id" como parámetro (GET).
 */
async function buscarProductoPorId(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Código de error: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Se busca la información de este producto de acuerdo al ID ${id}:`, data);
        return data;
    } catch (error) {
        console.error(`Error al buscar el producto con ID ${id}:`, error.message);
    }
}

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

/**
FileSystem
Utilizando el archivo creado en el punto anterior:
1- Agregar producto al archivo local
 */
async function agregarProductoLocal() {
    try {
        const nombreArchivo = 'productosJSON.json';
        
        const data = await fs.readFile(nombreArchivo, 'utf-8');
        const productos = JSON.parse(data);

        //Compara el ID más alto en el JSON para agregarle el ID al producto
        const maxId = productos.length > 0
            ? Math.max(...productos.map(p => p.id || 0))
            : 0;
        const productoParaAgregar = {

            id: maxId + 1,
            title: 'Monitor 4K',
            price: 350,
            description: 'Monitor de alta resolución ideal para desarrollo web.',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        };
        
        productos.push(productoParaAgregar);
        
        const productosActualizados = JSON.stringify(productos, null, 2);
        
        await fs.writeFile(nombreArchivo, productosActualizados);
        
        console.log(`Se agregó "Monitor 4K" a '${nombreArchivo}' con éxito.`);
        console.log('Te muestro el archivo actualizado:', productos);
    } catch (error) {
        console.error(`Hubo un error al agregar el producto al archivo: ${error.message}`);
    }
}

/**
2- Eliminar los productos superiores a un determinado valor.
 */
async function eliminarProductosPorValor() {
    try {
        const nombreArchivo = 'productosJSON.json';
        const valorLimite = 100;

        const data = await fs.readFile(nombreArchivo, 'utf-8');
        let productos = JSON.parse(data);
        
        const productosFiltrados = productos.filter(producto => producto.price <= valorLimite);
        
        if (productos.length === productosFiltrados.length) {
            console.log('No se encontraron productos con precio superior al valor límite.');
            return;
        }

        const productosActualizados = JSON.stringify(productosFiltrados, null, 2);
        
        await fs.writeFile(nombreArchivo, productosActualizados);
        
        console.log(`Productos con precio superior a ${valorLimite} eliminados de '${nombreArchivo}'.`);
        console.log('Te muestro el archivo actualizado:', productosFiltrados);
    } catch (error) {
        console.error(`Hubo un error al eliminar productos por valor: ${error.message}`);
    }
}

// ---Función para llamar a las funciones de manera secuencial ---

async function ejecutarProcesos() {
    try {
        console.log('Iniciando procesos... \n');
        
        await todosProductos();
        
        await productosLimitados(5); 

        await persistirProductosLimitados(5, 'productosJSON.json');
        
        await agregarProducto(nuevoProducto);
        
        await buscarProductoPorId(2);
        
        await eliminarProducto(1);
        
        await modificarProducto(3, nuevosDatos);

        await agregarProductoLocal();

        await eliminarProductosPorValor();

        console.log('\nTodos los procesos se ejecutaron correctamente.');

    } catch (error) {
        console.error('Hubo un error en la secuencia de procesos:', error);
    }
}

// Llama a la función principal para iniciar la secuencia
ejecutarProcesos();

