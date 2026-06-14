const express = require("express");
const app = express();
const PORT = 3000;
const swagggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

//Permite que a API entenda dados em formato JSON
app.use(express.json());

//Configuração Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de alunos",
            version: "1.0.0",
            description: "API REST de exemplo para a disciplina de Sistemas Web"
        },
        servers: [{ url: "http://localhost:3000" }]
    },
    //Onde o Swagger procura os comentários da documentação
    apis: ["./index.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

//Disponibiliza a documentação em http://localhost:3000/api-docs
app.use("/api-docs", swagggerUi.serve, swagggerUi.setup(swaggerDocs));

//Dados em memória
let alunos = [
    {id: 1, nome: "Pedro Maximo", curso: "Sistemas Web" },
    {id: 2, nome: "Carlos Valentim", curso: "Banco de Dados" }
];

/**
 * @swagger
 * /alunos:
 *      get:
 *          summary: Lista todos os alunos
 *          responses:
 *              200:
 *                  description: Lista de alunos retornada com sucesso
 */
//Retorna todos os alunos
app.get("/alunos", (req, res) => {
    res.json(alunos);
});

/**
 * @swagger
 * /alunos
 *      get:
 *          summary: Retorna aluno por id
 *          responses:
 *              200:
 *                  description: Aluno retornado com sucesso
 *              404:
 *                  description: Aluno não encontrado
 */
//Retorna aluno por id
app.get("/alunos/:id", (req,res) => {
    const aluno = alunos.find(a => a.id === Number(req.params.id));
    if (!aluno) {
        return res.status(404).json({mensagem: "Aluno não encontrado" });
    }
    res.json(aluno);
});

/**
 * @swaggger
 * /alunos:
 *      post:
 *          summary: Adiciona novo aluno ao array
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                      type: object
 *                      properties:
 *                          nome:
 *                              type: string
 *                          curso:
 *                              type: string
 *          responses:
 *              201:
 *                  description: Aluno criado com sucesso
 */
//Adiciona novo aluno ao array
app.post("/alunos", (req,res) => {
    const { nome, curso } = req.body;
    const novoAluno = {
        id: alunos.length ? alunos[alunos.length - 1].id +1 : 1, 
        nome, 
        curso
    };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

/**
 * @swagger
 * /alunos/{id}:
 *      put:
 *          summary: Atualiza informações de um aluno
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              nome: { type: string }
 *                              curso: { type: string }
 *          responses:
 *              200:
 *                  description: Aluno atualizado
 *              404:
 *                  description: Aluno não encontrado
 */
//Atualiza aluno existente
app.put("/alunos/:id", (req,res) => {
    const aluno = alunos.find(a => a.id === Number(req.params.id));
    if (!aluno) {
        return res.status(404).json({mensagem: "Aluno não encontrado"});
    }
    const { nome, curso } = req.body;
    aluno.nome = nome ?? aluno.nome;
    aluno.curso = curso ?? aluno.curso;
    res.status(200).json(aluno);
});

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Remove um aluno
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Aluno removido
 *       404:
 *         description: Aluno não encontrado
 */
//Remove um aluno
app.delete("/alunos/:id", (req,res) => {
    const aluno = alunos.find(a => a.id === Number(req.params.id));
    if (!aluno) {
        return res.status(404).json({mensagem: "Aluno não encontrado"});
    }
    alunos.splice(indice, 1);
    res.status(204).send();
});

//Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http:localhost:${PORT}`);
});