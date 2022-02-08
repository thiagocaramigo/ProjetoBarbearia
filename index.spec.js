const request = require("supertest");
const app = require("./index");

describe("Aplicação Produto.", () => {
  it("Teste da rota produtos/listar", async () => {
    const res = await request(app).get("/produtos/listar");
    // console.log(res);
    expect(res.body).toHaveProperty("output");
  });

  it("Teste da rota produto/buscar/:id", async () => {
    const res_buscar = await request(app).get("/produto/buscar/1");
    expect(res_buscar.body).toHaveProperty("output");
  });

  it("Teste da rota de cadastro produto/cadastro", async () => {
    const res_cadastro = await request(app)
      .post("/produto/cadastro")
      .send({
        nomeproduto: "fone",
        descricao: "fone philips",
        preco: 150.6,
        foto: "fone.png",
      })
      .set("Accept", "application/json")
      .expect(201);
    console.log(res_cadastro.text);
  });

  it("Teste da rota para atualizar produto/atualizar/:id", async () => {
    const res_atualizar = await request(app)
      .put("/produto/atualizar/1")
      .send({
        nomeproduto: "Microfone",
        descricao: "Microfone philips",
        preco: 40,
        foto: "microfone.jpg",
      })
      .set("Accept", "application/json")
      .expect(200);
    console.log(res_atualizar.text);
  });

  it("Testando a rota do delete produto/apagar", async () => {
    const res_apagar = await request(app)
      .delete("/produto/apagar/1")
      .set("Accept", "application/json")
      .expect(204);
  });
});
