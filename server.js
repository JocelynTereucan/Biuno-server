

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

    // Aquí puedes imprimir todo para revisar
    console.log("Datos recibidos:");
    console.log("Actividad:", actividadId);
    console.log("Niño:", childId);
    console.log("Respuesta:", respuestaSeleccionada);
    console.log("Correcta:", esCorrecta);
    console.log("Duración:", duracionSegundos);
    console.log("Reproducciones:", vecesEscuchoInstruccion);
    console.log("Timestamp:", timestamp);
    console.log("Imagen Base64 (primeros 100 caracteres):", imagenBase64.substring(0, 100));

    res.json({ message: "Datos recibidos correctamente" });
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
