import crypto from "crypto";

// La clase Product contiene todas las propiedades de los productos
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// La clase ProductManager gestiona los productos 
class ProductManager {
    constructor() {
        this.products = [];
        this.prodId = 1;
    }

    // Método para añadir productos nuevos
    addProduct(title, description, price, thumbnail, code, stock) {

        // Todos los campos deben ser obligatorios
        if (![title, description, price, thumbnail, code, stock].every(Boolean)) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        // La propiedad code no debe repetirse
        code = crypto.randomBytes(10).toString('hex')

        if (this.products.find(product => product.code === code)) {
            console.log("El código ya existe. No se puede repetir.");
            return;
        }

        // Agregar producto con id autoincrementable
        const product = new Product(title, description, price, thumbnail, code, stock);
        product.id = this.prodId++;
        
        // Agregar producto al arreglo de productos
        this.products.push(product);
        console.log("El producto fue agregado exitosamente.");
    }

    // Método para mostrar todos los productos añadidos
    getProducts() {
        return this.products;
    }

    // Método para buscar un producto en el array de productos por ID
    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
            console.log("Se encontró el siguiente productos:")
            return product;
        } else {
            console.error("El producto no fue encontrado.");
        }
    }
}

// Ejemplo para ver funcionamiento
const productManager = new ProductManager();

// Agrego productos 
productManager.addProduct("Harry Potter y el prisionero de Azkaban, J. K. Rowling", "Libro de fantasía/aventura", 25.000, "imagenLibro1.jpg", "code", 100);
productManager.addProduct("Y no quedó ninguno, Agatha Christie", "Libro de misterio", 14.000, "imagenLibro2.jpg", "code", 50);
productManager.addProduct("Orgullo y prejuicio, Jane Austen", "Libro de romance", 20.000, "imagenLibro3.jpg", "code", 80);

// Compruebo que todas los campos sean obligatorios
productManager.addProduct("It, Stephen King", "Libro de terror", 28.000, "code", 100);

//muestro mi lista de productos
console.log(productManager.getProducts());

//busco por id un producto que SI está en mi lista
console.log(productManager.getProductById(2))
//busco por id un producto que NO está en mi lista
console.log(productManager.getProductById(6))

 