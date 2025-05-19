const express = require("express");
const app = express();
const port = 3002;

app.use(express.json());

//RAIZ
app.get("/", (req, res) => {
  res.status(200).send("¡Bienvenida a nuestro sitio web!");
});

//PRODUCTOS
app.get("/productos", (req, res) => {
  res.status(200).send("Listado de productos");
});

app.post("/productos", (req, res) => {
  res.status(201).send("Crear un producto");
});

app.put("/productos", (req, res) => {
  res.status(204).send("Actualizar un producto");
});

app.delete("/productos", (req, res) => {
  res.status(204).send("Borrar un producto");
});

//USUARIOS
app.get("/usuarios", (req, res) => {
  res.status(200).send("Listado de usuarios");
});

app.post("/usuarios", (req, res) => {
  res.status(201).send("Crear un usuario");
});

app.put("/usuarios", (req, res) => {
  res.status(204).send("Actualizar un usuario");
});

app.delete("/usuarios", (req, res) => {
  res.status(204).send("Borrar un usuario");
});

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
