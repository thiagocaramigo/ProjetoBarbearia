function apagar() {
  if (confirm("Você deseja apagar esse produto?") == 0) {
    window.location.replace("index.html");
    return;
  }
  fetch(
    `http://localhost:5000/produto/apagar/${window.location.search.substring(
      4
    )}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    }
  ).catch((erro) => console.error(`Erro -> ${erro}`));
}

function carregarDadosAPI() {
  fetch("http://localhost:5000/produtos/listar")
    .then((response) => response.json())
    .then((resultado) => {
      var linha = `<div class="row justify-content-md-center">`;

      resultado.output.map((itens, ix) => {
        linha += `<div class="card col-2">
                <img src=${itens.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${itens.nomeproduto}</h5>
                    <p class="card-text">${itens.descricao}</p>
                    <p class="card-text">${itens.preco}</p>
                </div>

                <div class="card-footer">
                    <small class="text-muted">
                        <a href="atualizar.html?id=${itens.idproduto}">Atualizar</a>
                        <a href="apagar.html?id=${itens.idproduto}">Apagar</a>
                    </small>
                </div>
                </div> `;
      });

      linha += "</div>";

      document.getElementById("conteudo").innerHTML = linha;
    })
    .catch((erro) => console.error(`Erro ao carregar a API -> ${erro}`));
}

function cadastrar() {
  var nome = document.getElementById("txtNomeProduto").value;
  var descricao = document.getElementById("txtDescricao").value;
  var preco = document.getElementById("txtPreco").value;
  var foto = document.getElementById("txtFoto").value;

  fetch("http://localhost:5000/produto/cadastro", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nomeproduto: nome,
      descricao: descricao,
      preco: preco,
      foto: foto,
    }),
  })
    .then((response) => response.json())
    .then((dados) => {
      alert(
        `Dados cadastrados com sucesso!\n Id gerado: ${dados.output.insertId}`
      );

      document.getElementById("txtNomeProduto").value = "";
      document.getElementById("txtDescricao").value = "";
      document.getElementById("txtPreco").value = "";
      document.getElementById("txtFoto").value = "";
    })
    .catch((erro) => console.error(`Erro ao cadastrar -> ${erro}`));
}

function carregarAtualizar() {
  /*Obter o id passado na barra de endereço*/
  var id = window.location.search.substring(4);

  /*vamos fazer uma busca para receber o produto específico e carregar o formulário com dados*/
  fetch(`http://localhost:5000/produto/buscar/${id}`)
    .then((response) => response.json())
    .then((dados) => {
      console.log(dados);
      document.getElementById("txtNomeProduto").value =
        dados.output[0].nomeproduto;
      document.getElementById("txtDescricao").value = dados.output[0].descricao;
      document.getElementById("txtPreco").value = dados.output[0].preco;
      document.getElementById("txtFoto").value = dados.output[0].foto;
    })
    .catch((erro) => console.error(`Erro ao carregar a api -> ${erro}`));
}

function atualizar() {
  if (confirm("Você deseja atualizar este produto?") == 0) {
    return;
  }

  var id = window.location.search.substring(4);

  var nome = document.getElementById("txtNomeProduto").value;
  var descricao = document.getElementById("txtDescricao").value;
  var preco = document.getElementById("txtPreco").value;
  var foto = document.getElementById("txtFoto").value;

  fetch(`http://localhost:5000/produto/atualizar/${id}`, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nomeproduto: nome,
      descricao: descricao,
      preco: preco,
      foto: foto,
    }),
  })
    .then((response) => response.json())
    .then((dados) => {
      alert(dados.output.message);
    })
    .catch((erro) => console.error(`Erro ao tentar acessar a api -> ${erro}`));
}
