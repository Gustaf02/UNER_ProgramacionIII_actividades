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

/**
 * exporto el array
 */

/**
 * 2. Operaciones basicas y acceso
 * imprimo la longitud del array
 */

let logitudArray = productos
console.log(`Total de productos: ${logitudArray.length}`);

let segundoProducto = productos[1].nombre;
console.log(`Segundo producto: ${segundoProducto}`);

let cuartoProducto = productos[3].nombre;
console.log(`Cuarto producto: ${cuartoProducto}`)