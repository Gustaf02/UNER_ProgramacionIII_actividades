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
        console.log('\nTODOS LOS PRODUCTOS:',data);
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
        console.log(`\nPRODUCTOS LIMITADOS (${cantidad}): `, data);
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
        console.log(`\nPRODUCTOS LIMITADOS (${cantidad}) GRABADOS EN ${nombreArchivo}: `, data);

        await fs.writeFile(nombreArchivo, JSON.stringify(data, null, 2), 'utf-8');
        return data;

    }catch(error){
        console.error(`Error: ${error}`);
    }
}

/**
 * 4- A continuación, agrego un nuevo producto (POST)
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
        console.log('\nPRODUCTO AGREGADO CON EXITO: ', data);
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
        console.log(`\nINFORMACION DEL PRODUCTO CON ID = ${id}:`, data);
        return data;
    } catch (error) {
        console.error(`Error al buscar el producto con ID = ${id}:`, error.message);
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
        console.log(`\nPRODUCTO CON ID = ${id} ELIMINADO: `,productoEliminado);
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
}


//7------------------Modificar los datos de un producto (UPDATE).

let nuevosDatos = {
  "id": "",
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
    datosActualizados['id'] = id;       //Mantengo id original (ese campo no se actualiza)
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosActualizados)
    });
    if (!response.ok) {
      throw new Error(`Codigo de error: ${response.status}`);
    }
    const productoActualizado = await response.json();
    console.log(`\nPRODUCTO CON ID: ${id} ACTUALIZADO:`, productoActualizado);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

/**
FileSystem
Utilizando el archivo creado en el punto anterior:
1- Agregar producto al archivo local
 */
async function agregarProductoLocal(nombreArchivo) {
    try { 
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
        
        console.log(`\nSE AGREGO "MONITOR 4K" A '${nombreArchivo}' CON EXITO`);
        console.log('ARCHIVO ACTUALIZADO:', productos);
    } catch (error) {
        console.error(`Hubo un error al agregar el producto al archivo: ${error.message}`);
    }
}

/**
2- Eliminar los productos superiores a un determinado valor.
 */
async function eliminarProductosSuperiores(valor) {
    try {
        const nombreArchivo = 'productosJSON.json';

        const data = await fs.readFile(nombreArchivo, 'utf-8');
        let productos = JSON.parse(data);
        
        const productosFiltrados = productos.filter(producto => producto.price <= valor);
        
        if (productos.length === productosFiltrados.length) {
            console.log('\nNO SE ENCONTRARON PRODUCTOS CON VALOR SUPERIOR AL LIMITE');
            return;
        }

        const productosActualizados = JSON.stringify(productosFiltrados, null, 2);
        
        await fs.writeFile(nombreArchivo, productosActualizados);
        
        console.log(`\nPRODUCTOS CON VALOR SUPERIOR A ${valor} ELIMINADOS DE '${nombreArchivo}'.`);
        console.log('ARCHIVO ACTUALIZADO:', productosFiltrados);
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

        await agregarProductoLocal('productosJSON.json');

        await eliminarProductosSuperiores(100);

        console.log('\nTodos los procesos se ejecutaron correctamente.');

    } catch (error) {
        console.error('Hubo un error en la secuencia de procesos:', error);
    }
}

// Llama a la función principal para iniciar la secuencia
ejecutarProcesos();

