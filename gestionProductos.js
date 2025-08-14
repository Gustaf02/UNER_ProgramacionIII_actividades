/* 1. Configuración Inicial:
1) Instalar Node.js, ya que es el entorno de ejecución que utilizaremos.
2) Crear un nuevo archivo JavaScript (ej. gestionDatos.js).
3) Dentro de este archivo, declarar un array llamado productos   (o libros, turnos, etc.) que contenga al 
menos   5   objetos   JavaScript.   Cada   objeto   debe   representar   un   elemento   con   propiedades   como  id, 
nombre, precio y stock. 
*/

let productos = [
    {id: 1, nombre: 'Pan', precio: 6000, stock:15},
    {id: 2, nombre: 'Queso', precio: 9600, stock:10},
    {id: 3, nombre: 'Jamon', precio: 11000, stock:8},
    {id: 4, nombre: 'Yerba', precio: 2500, stock:30},
    {id: 5, nombre: 'Azucar', precio: 1400, stock:40},
];

/* 4. Manipulación de Arrays:
5. Crear un nuevo array llamado productosConStock que contenga solo los elementos del array productos
donde el stock sea mayor que 0 utilizando filter().*/ 

let productosConStock = productos.filter(producto => producto.stock > 0);
console.log("\n--- Productos en stock ---");
console.log(productosConStock);

/* 6. Crear un nuevo array llamado nombresProductos que contenga solo los nombres de todos los
productos en el inventario utilizando map().*/

let nombresProductos = productos.map(producto => producto.nombre);

console.log("\n--- Nombres de los productos ---");
console.log(nombresProductos); 

/* 7. Encontrar y guardar en una variable el primer producto en productos que tenga un id específico (ej. id:3)
utilizando find(). Si no lo encuentra, indicar que no existe. */

let idBuscado = 3; 
let primerProd = productos.find(producto => producto.id === idBuscado);

console.log("\n--- Primer producto encontrado con ID Nro 3 ---");
if (primerProd) {
  console.log(`Producto encontrado:`, primerProd);
} else {
  console.log(`No se encontró ningún producto con el ID ${idBuscado}.`);
}

/* 8. Crear un nuevo array llamado productosOrdenados que contenga los productos ordenados por precio
en orden decreciente. (investigar método sort()).
Imprimir en consola el array original o creado para verificar las operaciones realizadas. 
*/

const productosOrdenados = [...productos].sort((a, b) => a.precio - b.precio);

console.log("\n--- Productos ordenados por precio de mayor a menor ---");
console.log(productosOrdenados);

console.log("\n--- Lista original de productos (sin modificar) ---");
console.log(productos);