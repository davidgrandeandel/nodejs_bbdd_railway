// app.js
import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js';

const app = express();

// Ruta para agregar un usuario
app.get('/create', async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO users (name) VALUES ("John")');
        console.log(result); // Mostrar en la consola del servidor
        res.json(result); // Enviar el resultado a la página web
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para visualizar todos los usuarios
app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        console.log(rows); // Mostrar en la consola del servidor
        res.json(rows); // Enviar el resultado a la página web
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para ping
app.get('/ping', async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT "hello world" as RESULT`);
        console.log(result); // Mostrar en la consola del servidor
        res.json(result[0]); // Enviar el resultado a la página web
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto', PORT);
});
