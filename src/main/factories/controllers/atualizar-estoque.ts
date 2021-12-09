import { AtualizarEstoqueService } from "../../../data/services/atualizar-estoque"
import { EstoqueRepositoryTypeORM } from "../../../infra/estoque-repository"
import { AtualizarEstoqueController } from "../../../presentation/controllers/atualizar-estoque"
import { makeAtualizarEstoqueValidator } from "../validators/atualizar-estoque"

export const makeAtualizarEstoqueController = (): AtualizarEstoqueController => {
    const estoqueRepositoryTypeORM = new EstoqueRepositoryTypeORM()
    const atualizarEstoqueService = new AtualizarEstoqueService(estoqueRepositoryTypeORM)
    return new AtualizarEstoqueController(makeAtualizarEstoqueValidator(), atualizarEstoqueService)
}