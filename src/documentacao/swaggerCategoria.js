/**
 * Configuração do Swagger para o endpoint /categorias.
 */

/**
 * @swagger
 * /categoria:
 *   get:
 *     tags:
 *       - Categoria
 *      
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista de todas as categorias do usuario logado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de categorias do usuario logado.
 *       401:
 *         description: Não autorizado.  É necessário um token JWT válido.
 *       500:
 *         description: Erro interno do servidor.
 */

