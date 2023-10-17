const express = require('express');
const rotas = require('./rotas');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(rotas);

app.listen(process.env.PORT, () => console.log(`Servidor Desafio 3 Subiu na porta:${process.env.PORT}`))