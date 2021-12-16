import { AdicionarProdutoEstoqueService } from "../../../data/services/adicionar-produto-estoque"
import { AMQPClientAdapter } from "../../../infra/amqp-client"
import { EstoqueRepositoryTypeORM } from "../../../infra/estoque-repository"
import { ProdutoEstoqueRepositoryTypeORM } from "../../../infra/produto-estoque-repository"
import { AdicionarProdutoEstoqueController } from "../../../presentation/controllers/adicionar-produto-estoque"
import { makeAdicionarProdutoEstoqueValidator } from "../validators/adicionar-produto-estoque"

export const makeAdicionarProdutoEstoqueController = (): AdicionarProdutoEstoqueController => {
    const amqpClientAdapter = new AMQPClientAdapter()
    const estoqueRepositoryTypeORM = new EstoqueRepositoryTypeORM()
    const produtoEstoqueRepositoryTypeORM = new ProdutoEstoqueRepositoryTypeORM()
    const adicionarProdutoEstoqueService = new AdicionarProdutoEstoqueService(amqpClientAdapter, estoqueRepositoryTypeORM, produtoEstoqueRepositoryTypeORM)
    return new AdicionarProdutoEstoqueController(makeAdicionarProdutoEstoqueValidator(), adicionarProdutoEstoqueService)
}