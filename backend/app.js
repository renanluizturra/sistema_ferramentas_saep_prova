const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO';

    connectDB.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao buscar produtos' });
        }
        res.json(resultados);
    });
});
server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO ORDER BY nome ASC';

    connectDB.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao buscar produtos' });
        }
        res.json(resultados);
    });
});


const PORT = 3025;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});