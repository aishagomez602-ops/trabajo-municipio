const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const rutas = require('./routes/rutas');

app.use(cors());
app.use(express.json());
app.use('/api', rutas);

// Middleware de error global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
