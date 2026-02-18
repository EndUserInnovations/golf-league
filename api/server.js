require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Basic server heartbeat
app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'mnh-api', time: new Date().toISOString() });
});

// DB connection test
app.get('/health/db', async (req, res) => {
    const config = {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };

    try {
        const conn = await mysql.createConnection(config);
        const [rows] = await conn.query('SELECT NOW() AS time');
        await conn.end();

        res.json({
            ok: true,
            db: {
                connected: true,
                time: rows?.[0]?.time ?? null
            }
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            error: e.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`mnh-api running on http://localhost:${PORT}`);
    console.log(`CORS allowed origin: ${CORS_ORIGIN}`);
});
