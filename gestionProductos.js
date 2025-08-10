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

/**
 * 2. Operaciones básicas y acceso
 * imprimo la longitud del array
 */

let logitudArray = productos;
console.log(`Total de productos: ${logitudArray.length}`);

let segundoProducto = productos[1].nombre;
console.log(`Segundo producto: ${segundoProducto}`);

let cuartoProducto = productos[3].nombre;
console.log(`Cuarto producto: ${cuartoProducto}`);

/**
 *  3. Recorrido del Array: */

/* 3.1. bucle for...of */
console.log("--- Recorrido con for...of ---");
for (const producto of productos) {
  console.log(producto.nombre, producto.precio);
}

/* 3.2. método forEach() */
console.log("\n--- Recorrido con forEach() ---");
productos.forEach((producto) => {
  console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}`);
});

/* 4. Manipulación de Arrays: */

/* 4.1. Se agregan dos elementos al final del array productos utilizando push().*/
productos.push(
  { id: 6, nombre: 'Galletas', precio: 3000, stock: 25 },
  { id: 7, nombre: 'Leche', precio: 2200, stock: 18 }
);

console.log('--- Array de productos actualizado ---');
console.log(productos);
/* 4.2. Elimino el último elemento del array productos con pop(). */
productos.pop();
console.log('--- Array después de eliminar el último elemento (pop) ---');
console.log(productos);

/* 4.3. Agrego un nuevo elemento al inicio del array productos con unshift(). */
productos.unshift({ id: 0, nombre: 'Arroz', precio: 1800, stock: 50 });
console.log('--- Array después de agregar un elemento al inicio (unshift) ---');
console.log(productos);

/* 4.4. Elimino el primer elemento del array productos con shift(). */
productos.shift();
console.log('--- Array después de eliminar el primer elemento (shift) ---');
console.log(productos);