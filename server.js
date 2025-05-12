const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔐 Cargar credenciales de Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 📌 Middleware para loguear TODAS las solicitudes
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// 🏠 Ruta principal
app.get("/", (req, res) => {
  res.send("¡Servidor de Biuno funcionando!");
});

// 📤 Ruta para recibir datos desde Unity
app.post("/data", async (req, res) => {
  console.log("📦 Datos recibidos en POST /data:");
  console.log(JSON.stringify(req.body, null, 2));  // Imprimir JSON formateado

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

  try {
    await db.collection("resultados").add(nuevoResultado);
    console.log("✅ Datos guardados en Firebase");
    res.json({ message: "Datos guardados en Firebase exitosamente" });
  } catch (error) {
    console.error("❌ Error al guardar en Firebase:", error);
    res.status(500).json({ error: "Error al guardar en Firebase" });
  }
});

// 📥 Nueva ruta GET para ver todos los resultados
app.get("/data", async (req, res) => {
  try {
    const snapshot = await db.collection("resultados").orderBy("timestamp", "desc").get();
    const resultados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(resultados);
  } catch (error) {
    console.error("❌ Error al obtener datos de Firebase:", error);
    res.status(500).json({ error: "Error al obtener datos de Firebase" });
  }
});

// 🟢 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
