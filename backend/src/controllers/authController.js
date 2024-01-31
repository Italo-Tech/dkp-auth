const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dkp_auth',
});
const blacklist = [];

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const userExists = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
                if (err) reject(err);
                resolve(result.length > 0);
            });
        });

        if (userExists) {
            return res.status(400).json({ error: 'Nome de usuário já registrado' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere no banco de dados
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
            if (err) {
                console.error('Erro ao registrar:', err);
                res.status(500).json({ error: 'Erro ao registrar' });
            } else {
                res.status(201).json({ message: 'Registro bem-sucedido' });
            }
        });
    } catch (error) {
        console.error('Erro ao registrar:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
};

const login = (req, res) => {
    const { username, password } = req.body;

    // Consulta no banco de dados
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            res.status(500).json({ error: 'Erro ao fazer login' });
        } else if (result.length > 0) {
            const match = await bcrypt.compare(password, result[0].password);

            if (match) {
                const token = jwt.sign({ username }, 'seu_segredo', { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Credenciais inválidas' });
            }
        } else {
            res.status(401).json({ error: 'Usuário não encontrado' });
        }
    });
};

// Middleware para proteção de rotas com JWT
const protectRoute = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'seu_segredo', (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Token inválido' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Token não fornecido' });
    }
};

// Rota protegida
const protected = (req, res) => {
    res.json({ message: 'Rota protegida alcançada', user: req.user });
};

const logout = (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Adiciona o token à lista negra
    blacklist.push(token);

    // Responde com sucesso
    res.status(200).json({ message: 'Logout bem-sucedido' });
}

module.exports = { register, login, protected, logout };
