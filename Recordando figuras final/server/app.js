// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Importa el pool
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Sirve index.html desde /public

// Crear tabla si no existe
(async () => {
  try {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS players (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100),
        intento INT,
        tiempo INT,
        errores INT,
        gano BOOLEAN
      )
    `;
    const conn = await pool.getConnection();
    await conn.query(createTableSQL);
    conn.release();
    console.log('✅ Tabla "players" lista');
  } catch (err) {
    console.error('❌ Error al crear la tabla:', err);
  }
})();

// Guardar datos del jugador
app.post('/save', async (req, res) => {
  try {
    const { nombre, intento, tiempo, errores, gano } = req.body;
    const [result] = await pool.query(
      `INSERT INTO players (nombre, intento, tiempo, errores, gano) VALUES (?, ?, ?, ?, ?)`,
      [nombre, intento, tiempo, errores, gano]
    );
    res.json({ id: result.insertId, message: 'Jugador guardado correctamente' });
  } catch (err) {
    console.error('❌ Error al guardar:', err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener lista de jugadores
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM players`);
    res.json({ users: rows });
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err);
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});


