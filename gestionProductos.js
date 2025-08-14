/* 1. Configuración Inicial:
1) Instalar Node.js, ya que es el entorno de ejecución que utilizaremos.
2) Crear un nuevo archivo JavaScript (ej. gestionDatos.js).
3) Dentro de este archivo, declarar un array llamado productos   (o libros, turnos, etc.) que contenga al 
menos   5   objetos   JavaScript.   Cada   objeto   debe   representar   un   elemento   con   propiedades   como  id, 
nombre, precio y stock. 
*/

let productos = [
  { id: 1, nombre: "Pan", precio: 6000, stock: 15 },
  { id: 2, nombre: "Queso", precio: 9600, stock: 10 },
  { id: 3, nombre: "Jamón", precio: 11000, stock: 8 },
  { id: 4, nombre: "Yerba", precio: 2500, stock: 30 },
  { id: 5, nombre: "Azúcar", precio: 1400, stock: 40 },
];

console.log(productos);

const productosOriginal = [...productos]; 

/**
 * 2. Operaciones básicas y acceso
 * imprimo la longitud del array
 */

let longitudArray = productos.length;
console.log(`Total de productos: ${longitudArray}`);

let segundoProducto = productos[1].nombre;
console.log(`Segundo producto: ${segundoProducto}`);

let cuartoProducto = productos[3].nombre;
console.log(`Cuarto producto: ${cuartoProducto}`);

/**
 *  3. Recorrido del Array: */

/* 3.1. bucle for...of */
console.log("--- Recorrido con for...of ---");
for (const producto of productos) {
  console.log(`${producto.nombre}, Precio: $${producto.precio}`);
}

/* 3.2. método forEach() */
console.log("\n--- Recorrido con forEach() ---");
productos.forEach((producto) => {
  console.log(`Producto: ${producto.nombre}, Precio: $${producto.precio}`);
});

/* 4. Manipulación de Arrays: */

/* 4.1. Se agregan dos elementos al final del array productos utilizando push().*/
productos.push(
  { id: 6, nombre: "Galletas", precio: 3000, stock: 25 },
  { id: 7, nombre: "Leche", precio: 2200, stock: 18 }
);

console.log("--- Array de productos actualizado ---");
console.log(productos);
/* 4.2. Elimino el último elemento del array productos con pop(). */
productos.pop();
console.log("--- Array después de eliminar el último elemento (pop) ---");
console.log(productos);

/* 4.3. Agrego un nuevo elemento al inicio del array productos con unshift(). */
productos.unshift({ id: 0, nombre: "Arroz", precio: 1800, stock: 50 });
console.log("--- Array después de agregar un elemento al inicio (unshift) ---");
console.log(productos);

/* 4.4. Elimino el primer elemento del array productos con shift(). */
productos.shift();
console.log("--- Array después de eliminar el primer elemento (shift) ---");
console.log(productos);

/* 4.5. Crear un nuevo array llamado productosConStock que contenga solo los elementos del array productos
donde el stock sea mayor que 0 utilizando filter().*/

let productosConStock = productos.filter((producto) => producto.stock > 0);
console.log("\n--- Productos en stock ---");
console.log(productosConStock);

/* 4.6. Crear un nuevo array llamado nombresProductos que contenga solo los nombres de todos los
productos en el inventario utilizando map().*/

let nombresProductos = productos.map((producto) => producto.nombre);

console.log("\n--- Nombres de los productos ---");
console.log(nombresProductos);

/* 4.7. Encontrar y guardar en una variable el primer producto en productos que tenga un id específico (ej. id:3)
utilizando find(). Si no lo encuentra, indicar que no existe. */

let idBuscado = 3;
let primerProd = productos.find((producto) => producto.id === idBuscado);

console.log("\n--- Primer producto encontrado con ID Nro 3 ---");
if (primerProd) {
  console.log(`Producto encontrado:`, primerProd);
} else {
  console.log(`No se encontró ningún producto con el ID ${idBuscado}.`);
}

/* 4.8. Crear un nuevo array llamado productosOrdenados que contenga los productos ordenados por precio
en orden decreciente. (investigar método sort()).
Imprimir en consola el array original o creado para verificar las operaciones realizadas. 
*/

const productosOrdenados = [...productos].sort((a, b) => b.precio - a.precio);

console.log("\n--- Productos ordenados por precio de mayor a menor ---");
console.log(productosOrdenados);

console.log("\n--- Lista original de productos (sin modificar) ---");
console.log(productosOriginal);
