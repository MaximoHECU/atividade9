const express = require("express");
const app = express();
const PORT = 3000;

//Permite que a API entenda dados em formato JSON
app.use(express.json());

//Dados em memória
let alunos = [
    {id: 1, nome: "Pedro Maximo", curso: "Sistemas Web" },
    {id: 2, nome: "Carlos Valentim", curso: "Banco de Dados" }
];

//Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http:localhost:${PORT}`);
});

//Retorna todos os alunos
app.get("/alunos", (req, res) => {
    res.json(alunos);
});

//Retorna aluno por id
app.get("/alunos/:id", (req,res) => {
    const aluno = alunos.find(a => a.id === Number(req.params.id));
    if (!aluno) {
        return res.status(404).json({mensagem: "Aluno não encontrado" });
    }
    res.json(aluno);
});

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

//Remove um aluno
app.delete("/alunos/:id", (req,res) => {
    const aluno = alunos.find(a => a.id === Number(req.params.id));
    if (!aluno) {
        return res.status(404).json({mensagem: "Aluno não encontrado"});
    }
    alunos.splice(indice, 1);
    res.status
});