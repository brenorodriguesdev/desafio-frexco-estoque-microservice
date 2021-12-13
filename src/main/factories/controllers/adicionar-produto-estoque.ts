import { AdicionarProdutoEstoqueService } from "../../../data/services/adicionar-produto-estoque"
import { ProdutoEstoqueRepositoryTypeORM } from "../../../infra/produto-estoque-repository"
import { AdicionarProdutoEstoqueController } from "../../../presentation/controllers/adicionar-produto-estoque"
import { makeAdicionarProdutoEstoqueValidator } from "../validators/adicionar-produto-estoque"

export const makeAdicionarProdutoEstoqueController = (): AdicionarProdutoEstoqueController => {
    const produtoEstoqueRepositoryTypeORM = new ProdutoEstoqueRepositoryTypeORM()
    const adicionarProdutoEstoqueService = new AdicionarProdutoEstoqueService(produtoEstoqueRepositoryTypeORM)
    return new AdicionarProdutoEstoqueController(makeAdicionarProdutoEstoqueValidator(), adicionarProdutoEstoqueService)
}