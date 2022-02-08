/*
Vamos criar um servidor de banckend para cadastrar dados em um banco de dados MySQL. Esse 
projeto deverá receber comandos de teste.
*/

//TDD -> Test Development Drive

//importar o módulo do express
const express = require("express");

//importar o módulo do mysql para a manipulação de banco de dados
const mysql = require("mysql");

// importar o módulo do cors para tratar urls que veem do frontend
const cors = require("cors");

// Vamos usar o servidor express passando como referência a constante app
const app = express();

// Preparar o servidor para receber dados em formato json ou não
app.use(express.json());

//Aplicar o cors no projeto
app.use(cors());

/*
Estabelecer a conexão com o banco de dados e realizar um CRUD na base
*/
const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbprodutos",
});

/*
Testar e estabelecer a conxao com o banco de dados
*/
conexao.connect((erro) => {
  if (erro) {
    console.error("Erro ao tentar estabelecer a conexão " + erro.stack);
    return;
  }
  console.log("Conectado ao banco -> " + conexao.threadId);
});

//Testes de rota usando a arquitetura http com os verbos: GET, POST, PUT, DELETE

//rota para o método get. Apenas para consulta de dados
app.get("/produtos/listar", (req, res) => {
  //consultar sql para selecionar os produtos no banco de dados
  conexao.query("select * from tbproduto", (erro, resultado) => {
    if (erro) {
      return res
        .status(500)
        .send({ output: "Erro ao tentar executar a consulta " + erro });
    }
    res.status(200).send({ output: resultado });
  });
});

//rota para o método get, buscando apenas um produto
app.get("/produto/buscar/:id", (req, res) => {
  conexao.query(
    "select * from tbproduto where idproduto=?",
    [req.params.id],
    (erro, resultado) => {
      if (erro) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar executar a consulta ${erro}` });
      }
      if (resultado == null || resultado == "") {
        return res
          .status(404)
          .send({ output: `Não foi possível localizar este produto` });
      }
      res.status(200).send({ output: resultado });
    }
  );
});

// rota para o método post. Apenas para cadastro de dados
app.post("/produto/cadastro", (req, res) => {
  conexao.query(
    "insert into tbproduto set ?",
    [req.body],
    (erro, resultado) => {
      if (erro) {
        res
          .status(500)
          .send({ output: `Não foi possível cadastrar -> ${erro}` });
        return;
      }
      res.status(201).send({ output: resultado });
    }
  );
});

//rota para o método put. Apenas para atualizar os dados
app.put("/produto/atualizar/:id", (req, res) => {
  conexao.query(
    "update tbproduto set ? where idproduto=?",
    [req.body, req.params.id],
    (erro, resultado) => {
      if (erro) {
        res
          .status(500)
          .send({ output: `Erro ao tentar atualizar os dados -> ${erro}` });
        return;
      }
      res.status(200).send({ output: resultado });
    }
  );
});

// rota para método delete. Apenas para apagar os dados.
app.delete("/produto/apagar/:id", (req, res) => {
  conexao.query(
    "delete from tbproduto where idproduto = ?",
    [req.params.id],
    (erro, resultado) => {
      if (erro) {
        res
          .status(500)
          .send({ output: `Erro ao tentar apagar o produto -> ${erro}` });
        return;
      }
      res.status(204).send({ output: resultado });
    }
  );
});

//Subir o servidor na porta 5000
app.listen("5000", () =>
  console.log("Servidor online em: http://localhost:5000")
);

module.exports = app;
