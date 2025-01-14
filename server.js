const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("¡Servidor de Biuno funcionando!");
});

// Nueva ruta POST
app.post("/data", (req, res) => {
    const { nombre, edad } = req.body;
    if (!nombre || !edad) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    res.json({ message: `Datos recibidos: ${nombre}, ${edad}` });
  });
  

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
