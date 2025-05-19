const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const productsData = {
  description: "Productos",
  items: [
    { id: 1, nombre: "Taza de Harry Potter", precio: 300 },
    { id: 2, nombre: "FIFA 22 PS5", precio: 1000 },
    { id: 3, nombre: "Figura Goku Super Saiyan", precio: 100 },
    { id: 4, nombre: "Zelda Breath of the Wild", precio: 200 },
    { id: 5, nombre: "Skin Valorant", precio: 120 },
    { id: 6, nombre: "Taza de Star Wars", precio: 220 },
  ],
};

//SHOW LIST
app.get("/products", (req, res) => {
  res.json(productsData);
});

//CREATE
app.post("/products", (req, res) => {
  const newProduct = req.body;
  if (!newProduct.nombre || typeof newProduct.precio !== "number") {
    return res
      .status(400)
      .json({ error: "El producto debe tener un nombre y un precio válido." });
  }
  newProduct.id = productsData.items.length + 1;
  productsData.items.push(newProduct);
  res
    .status(201)
    .json({ message: "Producto creado con éxito", product: newProduct });
});

//UPDATE
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = productsData.items.findIndex((item) => item.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }

  if (updatedProduct.nombre) {
    productsData.items[index].nombre = updatedProduct.nombre;
  }
  if (typeof updatedProduct.precio === "number") {
    productsData.items[index].precio = updatedProduct.precio;
  }

  res.status(200).json({
    message: "Producto actualizado con éxito",
    product: productsData.items[index],
  });
});

//DELETE
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const initialLength = productsData.items.length;
  productsData.items = productsData.items.filter(
    (item) => item.id !== productId
  );

  if (productsData.items.length === initialLength) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }

  res.status(200).json({ message: "Producto eliminado con éxito" });
});

//MAX. PRODUCT PRICE FILTER
app.get("/products/filter/precio", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  if (isNaN(maxPrice)) {
    return res
      .status(400)
      .json({ error: "El parámetro maxPrice debe ser un número." });
  }
  const filteredProducts = productsData.items.filter(
    (item) => item.precio <= maxPrice
  );
  res.status(200).json({
    description: `Productos con precio máximo ${maxPrice}`,
    items: filteredProducts,
  });
});

//PRICE RANGE
app.get("/products/filter/rango-precio", (req, res) => {
  const minPrice = 50;
  const maxPrice = 250;

  const filteredProducts = productsData.items.filter(
    (item) => item.precio >= minPrice && item.precio <= maxPrice
  );
  res.status(200).json({
    description: `Productos con precio entre ${minPrice} y ${maxPrice}`,
    items: filteredProducts,
  });
});

//ID FILTER
app.get("/products/filter/id/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  if (isNaN(productId)) {
    return res
      .status(400)
      .json({ error: "El parámetro id debe ser un número." });
  }
  const product = productsData.items.find((item) => item.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado." });
  }
  res
    .status(200)
    .json({ description: `Producto con ID ${productId}`, items: [product] });
});

//NAME FILTER
app.get("/products/filter/nombre/:nombre", (req, res) => {
  const nameFilter = req.params.nombre.toLowerCase();
  const findProducts = productsData.items.filter((item) =>
    item.nombre.toLowerCase().includes(nameFilter)
  );
  res.status(200).json({
    description: `Productos que contienen "${nameFilter}" en su nombre`,
    items: findProducts,
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
