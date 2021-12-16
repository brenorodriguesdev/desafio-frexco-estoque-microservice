import { DeletarProdutoEstoqueService } from "../../../data/services/deletar-produto-estoque"
import { AMQPClientAdapter } from "../../../infra/amqp-client"
import { EstoqueRepositoryTypeORM } from "../../../infra/estoque-repository"
import { ProdutoEstoqueRepositoryTypeORM } from "../../../infra/produto-estoque-repository"
import { DeletarProdutoEstoqueController } from "../../../presentation/controllers/deletar-produto-estoque"
import { makeDeletarProdutoEstoqueValidator } from "../validators/deletar-produto-estoque"

export const makeDeletarProdutoEstoqueController = (): DeletarProdutoEstoqueController => {
    const amqpClientAdapter = new AMQPClientAdapter()
    const estoqueRepositoryTypeORM = new EstoqueRepositoryTypeORM()
    const produtoEstoqueRepositoryTypeORM = new ProdutoEstoqueRepositoryTypeORM()
    const deletarProdutoEstoqueService = new DeletarProdutoEstoqueService(amqpClientAdapter, estoqueRepositoryTypeORM, produtoEstoqueRepositoryTypeORM)
    return new DeletarProdutoEstoqueController(makeDeletarProdutoEstoqueValidator(), deletarProdutoEstoqueService)
}