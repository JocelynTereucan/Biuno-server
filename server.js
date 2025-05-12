const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("¡Servidor de Biuno funcionando!");
});

// Nueva ruta POST
app.post("/data", (req, res) => {
    const {
        actividadId,
        childId,
        respuestaSeleccionada,
        esCorrecta,
        duracionSegundos,
        vecesEscuchoInstruccion,
        timestamp,
        imagenBase64
    } = req.body;

    if (!childId || !respuestaSeleccionada || !timestamp) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const nuevoResultado = {
        actividadId,
        childId,
        respuestaSeleccionada,
        esCorrecta,
        duracionSegundos,
        vecesEscuchoInstruccion,
        timestamp,
        imagenBase64
    };

    const filePath = path.join(__dirname, "resultados.json");

    // Leer archivo anterior (si existe)
    let resultados = [];
    if (fs.existsSync(filePath)) {
        const contenido = fs.readFileSync(filePath, "utf8");
        resultados = contenido ? JSON.parse(contenido) : [];
    }

    // Agregar nuevo resultado
    resultados.push(nuevoResultado);

    // Guardar de nuevo
    fs.writeFileSync(filePath, JSON.stringify(resultados, null, 2));

    res.json({ message: "Datos recibidos y guardados exitosamente" });
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
