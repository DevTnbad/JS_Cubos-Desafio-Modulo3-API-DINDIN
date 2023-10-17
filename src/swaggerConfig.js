const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API De Controle Financeiro Pessoal.',
            version: '1.0.0',
            description: 'API Dindin',
        },
        // tags: [ // Defina as tags aqui
        //     {
        //         name: 'Categoria',
        //         description: 'Operações relacionadas a categorias',
        //     },
        // ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    //apis: ['./src/controladores/*.js'], // Caminho para os arquivos que contêm as rotas da API
    apis: ['./src/documentacao/*.js'], // Caminho para os arquivos que contêm as rotas da API
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
