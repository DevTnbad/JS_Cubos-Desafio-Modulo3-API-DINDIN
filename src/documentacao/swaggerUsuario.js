/**
 * Configuração do Swagger para o endpoint /usuarios.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Login de Usuário
 *     description: Realiza a autenticação de um usuário e gera um token de acesso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário.
 *                 example: toddy2@teste.com
 *               senha:
 *                 type: string
 *                 description: A senha do usuário.
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna um token de acesso.
 *       400:
 *         description: Parâmetros de entrada inválidos.
 *       401:
 *         description: Credenciais de login inválidas.
 */

/**
 * @swagger
 * /usuario:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Cadastrar Usuário
 *     description: Cria um novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome do usuário.
 *               email:
 *                 type: string
 *                 description: O email do usuário.
 *               senha:
 *                 type: string
 *                 description: A senha do usuário.
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *       400:
 *         description: Parâmetros de entrada inválidos ou usuário já existente.
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Detalhar informações do usuário autenticado
 *     description: Retorna informações detalhadas do usuário autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso. Retorna as informações do usuário autenticado.
 *       401:
 *         description: Não autorizado. O token JWT é necessário.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /usuario:
 *   put:
 *     tags:
 *       - Usuario
 *     summary: Atualizar informações do usuário
 *     description: Atualiza informações do usuário autenticado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Novo nome do usuário.
 *               email:
 *                 type: string
 *                 description: Novo email do usuário.
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário.
 *     responses:
 *       204:
 *         description: Sucesso. As informações do usuário foram atualizadas.
 *       400:
 *         description: Parâmetros de entrada inválidos ou e-mail já em uso.
 *       401:
 *         description: Não autorizado. O token JWT é necessário.
 *       500:
 *         description: Erro interno do servidor.
 */
