const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const routes = require('./routes/auth');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dkp_auth',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

app.use(cors()); // Habilita o CORS para todos os domínios

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
