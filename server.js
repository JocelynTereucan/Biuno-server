const express = require("express");
const cors = require("cors");
require("dotenv").config();
const supabase = require("./supabaseClient");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("¡Servidor de Biuno funcionando!");
});

// Ejemplo de endpoint: obtener todos los estudiantes
app.get("/students", async (req, res) => {
    const { data, error } = await supabase.from("student").select("*");
    if (error) return res.status(500).json({ error });
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
