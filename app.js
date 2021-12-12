const express = require('express');
const cors = require('cors');
const app = express();
const porta = 3000;
const usuarioController = require('./back/controller/usuario_controller');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({
    origin: "http://localhost:3000",

}));

// Valida o Token JWT
const loginRota = require('./back/rotas/login_rota');
app.use('/login', loginRota);
// Necessita do Token JWT Validado para poder acessar
const usuarioRota = require('./back/rotas/usuario_rota');
app.use('/usuarios', usuarioController.validarToken, usuarioRota);

const pessoasRota = require('./back/rotas/pessoas_rota');
app.use('/pessoas', pessoasRota);

const filaRota = require('./back/rotas/fila_rota');
app.use('/fila', filaRota);

app.listen(porta, () =>
    console.log(`Iniciando o servidor na porta ${porta}`)
);