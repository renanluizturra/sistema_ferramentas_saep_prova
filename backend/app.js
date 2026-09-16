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
server.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM PRODUTO WHERE id_produto = ?';

    connectDB.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao buscar produtos' });
        }
        res.json(resultados);
    });
});
server.get('/produtos/:busca/:nome', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO WHERE nome LIKE ?';
    const termoBusca = '%' + req.params.nome + '%';
    
    connectDB.query(sql, [termoBusca], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao buscar produtos' });
        }
        res.json(resultados);
    });
});
server.post('/produtos', (req, res) => {
    const {id_categoria, nome, cor, textura, peso, unidade_medida, aplicacao,
         data_validade, estoque_minimo, estoque_atual, preco_unitario
        } = req.body;

        if(id_categoria == null || nome == null || cor == null || textura == null || peso == null || unidade_medida == null || aplicacao == null 
            || data_validade == null || estoque_minimo == null || estoque_atual == null || preco_unitario == null){
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
        }

        const sql = 'INSERT INTO PRODUTO (id_categoria, nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    
    connectDB.query(sql, [id_categoria, nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao inserir produto' });
        }
        res.json({
            mensagem: 'Produto inserido com sucesso',
            id: resultado.insertId
        });
    });
});



const PORT = 3025;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
