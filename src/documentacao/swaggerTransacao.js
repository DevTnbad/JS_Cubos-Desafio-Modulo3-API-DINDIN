/**
 * @swagger
 * /transacao:
 *   get:
 *     tags:
 *       - Transacoes
 *     summary: Lista todas as transações do usuário logado.
 *     description: Retorna todas as transações do usuário logado, com a opção de filtrar por categoria.
 *     parameters:
 *       - in: query
 *         name: filtro
 *         required: opcional // 
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: Filtre as transações por categoria(s). Digite a categoria ou parte da categoria desejada.
 *         required: false  // Defina como opcional
 *     responses:
 *       '200':
 *         description: Lista de transações retornada com sucesso.
 *       '500':
 *         description: Erro interno do servidor.
 */


/**
 * @swagger
 * /transacao/{id}:
 *   get:
 *     tags:
 *       - Transacoes
 *     summary: Retorna uma transação do usuário logado por ID.
 *     description: Retorna os detalhes de uma transação específica do usuário logado com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da transação a ser consultada.
 *     responses:
 *       '200':
 *         description: Detalhes da transação retornados com sucesso.
 *       '400':
 *         description: Transação não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /transacao:
 *   post:
 *     tags:
 *       - Transacoes
 *     summary: Cadastra uma nova transação para o usuário logado.
 *     description: |
 *       Cadastra uma nova transação com os detalhes fornecidos, incluindo a data no formato YYYY-MM-DD.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: ['entrada', 'saida']
 *                 description: Tipo de transação (entrada ou saída).
 *               descricao:
 *                 type: string
 *                 description: Descrição da transação.
 *               valor:
 *                 type: number
 *                 description: Valor da transação.
 *               data:
 *                 type: string
 *                 description: Data da transação no formato YYYY-MM-DD.
 *               categoria_id:
 *                 type: integer
 *                 description: ID da categoria associada à transação.
 *     responses:
 *       '201':
 *         description: Transação cadastrada com sucesso.
 *       '400':
 *         description: Campos obrigatórios não informados ou tipo de transação inválido.
 *       '404':
 *         description: Categoria não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /transacao/{id}:
 *   put:
 *     tags:
 *       - Transacoes 
 *     summary: Atualiza uma transação existente do usuário logado.
 *     description: |
 *       Atualiza uma transação existente com os detalhes fornecidos, incluindo a data no formato YYYY-MM-DD.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da transação a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: ['entrada', 'saida']
 *                 description: Tipo de transação (entrada ou saída).
 *               descricao:
 *                 type: string
 *                 description: Descrição da transação.
 *               valor:
 *                 type: number
 *                 description: Valor da transação.
 *               data:
 *                 type: string
 *                 description: Data da transação no formato YYYY-MM-DD.
 *               categoria_id:
 *                 type: integer
 *                 description: ID da categoria associada à transação.
 *               format:
 *                 type: string
 *                 example: 'YYYY-MM-DD'
 *     responses:
 *       '204':
 *         description: Transação atualizada com sucesso.
 *       '400':
 *         description: Campos obrigatórios não informados ou tipo de transação inválido.
 *       '404':
 *         description: Transação não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /transacao/{id}:
 *   delete:
 *     tags:
 *       - Transacoes
 *     summary: Exclui uma transação.
 *     description: Exclui uma transação com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da transação a ser excluída.
 *     responses:
 *       '200':
 *         description: Transação excluída com sucesso.
 *       '404':
 *         description: Transação não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /transacao/extrato:
 *   get:
 *     tags:
 *       - Transacoes
 *     summary: Obtém o extrato de transações.
 *     description: Obtém o extrato das transações de um usuário, mostrando a soma dos valores de entrada e saída.
 *     responses:
 *       '200':
 *         description: Extrato de transações retornado com sucesso.
 *       '500':
 *         description: Erro interno do servidor.
 */