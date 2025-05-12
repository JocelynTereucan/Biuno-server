const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const admin = require("firebase-admin");
const serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get("/", (req, res) => {
  res.send("¡Servidor de Biuno funcionando!");
});

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

  db.collection("resultados").add(nuevoResultado)
    .then(() => {
      res.json({ message: "Datos guardados en Firebase exitosamente" });
    })
    .catch((error) => {
      console.error("Error al guardar en Firebase:", error);
      res.status(500).json({ error: "Error al guardar en Firebase" });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
