const mysql = require('mysql2/promise');

let db;

async function connectDB() {
    db = await mysql.createConnection({
        host: process.env.DB_HOST || 'mysql.railway.internal',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'LNNExntdHlbDSNuSvrlayPcrAwBrOQmw',
        database: process.env.DB_NAME || 'railway'
    });

    await db.query(`
        CREATE TABLE IF NOT EXISTS players (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100),
            intento INT,
            tiempo INT,
            errores INT
        )
    `);

    console.log("Conectado a MySQL y tabla lista.");
}

async function insertPlayer(nombre, intento, tiempo, errores) {
    const [result] = await db.query(
        `INSERT INTO players (nombre, intento, tiempo, errores) VALUES (?, ?, ?, ?)`,
        [nombre, intento, tiempo, errores]
    );
    return result.insertId;
}

async function getPlayers() {
    const [rows] = await db.query(`SELECT * FROM players`);
    return rows;
}

module.exports = { connectDB, insertPlayer, getPlayers };
