const express = require('express');
const rotas = require('./rotas');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(rotas);
const porta = process.env.PORT || 3000
app.listen(porta, () => console.log(`Servidor Desafio 3 Subiu na porta:${porta}`))