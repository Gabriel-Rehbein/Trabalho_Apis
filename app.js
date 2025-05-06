//professor, escrevi alguns comentarios para não me perder no estudo <-----

const express = require('express')
const produtoService = require("./service/produto_service")
const app = express()
const port = 3000
app.use(express.json()) // for parsing application/json
app.get('/', (req, res) => {
 res.send('Hello World!')
})

// Resposta da rota do servidor
app.get('/produtos', (req, res)=> {
    res.json(produtoService.listar());
   })
   

// [GET] - pelo o que eu entendi, isso lista todos os produtos
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

// [GET] isso consgue obter produto por ID
app.get('/produtos/:id', (req, res)=> {
    const id = +req.params.id;
    try {
    res.json(produtoService.buscarPorId(id));
    } catch(err) {
    res.status(err.id).json(err);
    }
   })
   

// [POST] cria uns novos produto
app.post('/produtos', (req, res)=> {
    let produto = req.body;
    try {
    produtoService.inserir(produto);
    res.status(201).json(produto);
    }
    catch(err) {
    res.status(err.id).json(err);
    }
   })

// [PUT] da uma atualizada no produto
app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" }); // mensagem de erro

    produto.nome = nome;
    produto.preco = preco;
    res.json(produto);
});

// [DELETE] deleta a desgraça do produto
app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: "Produto não encontrado" }); // outra mensagem de erro

    produtos.splice(index, 1);
    res.json({ mensagem: "Produto deletado com sucesso" }); // SUCESSO mensagem 
});

// Iniciar o servidor do Gabriel
app.listen(port, () => {
    console.log(`Servidor de Gabriel executando na porta ${port}`);
});
