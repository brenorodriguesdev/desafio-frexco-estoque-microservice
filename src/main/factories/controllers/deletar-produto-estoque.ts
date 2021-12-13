import { DeletarProdutoEstoqueService } from "../../../data/services/deletar-produto-estoque"
import { ProdutoEstoqueRepositoryTypeORM } from "../../../infra/produto-estoque-repository"
import { DeletarProdutoEstoqueController } from "../../../presentation/controllers/deletar-produto-estoque"
import { makeDeletarProdutoEstoqueValidator } from "../validators/deletar-produto-estoque"

export const makeDeletarProdutoEstoqueController = (): DeletarProdutoEstoqueController => {
    const produtoEstoqueRepositoryTypeORM = new ProdutoEstoqueRepositoryTypeORM()
    const deletarProdutoEstoqueService = new DeletarProdutoEstoqueService(produtoEstoqueRepositoryTypeORM)
    return new DeletarProdutoEstoqueController(makeDeletarProdutoEstoqueValidator(), deletarProdutoEstoqueService)
}