import { ListarProdutoEstoquePorEstoqueService } from "../../../data/services/listar-produto-estoque-por-estoque"
import { ProdutoEstoqueRepositoryTypeORM } from "../../../infra/produto-estoque-repository"
import { ListarProdutoEstoquePorEstoqueController } from "../../../presentation/controllers/listar-produto-estoque-por-estoque"
import { makeListarProdutoEstoquePorEstoqueValidator } from "../validators/listar-produto-estoque-por-estoque"

export const makeListarProdutoEstoquePorEstoqueController = (): ListarProdutoEstoquePorEstoqueController => {
    const produtoEstoqueRepositoryTypeORM = new ProdutoEstoqueRepositoryTypeORM()
    const listarProdutoEstoquePorEstoqueService = new ListarProdutoEstoquePorEstoqueService(produtoEstoqueRepositoryTypeORM)
    return new ListarProdutoEstoquePorEstoqueController(makeListarProdutoEstoquePorEstoqueValidator(), listarProdutoEstoquePorEstoqueService)
}