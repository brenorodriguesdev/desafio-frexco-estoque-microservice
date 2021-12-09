import { DeletarEstoqueService } from "../../../data/services/deletar-estoque"
import { EstoqueRepositoryTypeORM } from "../../../infra/estoque-repository"
import { DeletarEstoqueController } from "../../../presentation/controllers/deletar-estoque"
import { makeDeletarEstoqueValidator } from "../validators/deletar-estoque"

export const makeDeletarEstoqueController = (): DeletarEstoqueController => {
    const estoqueRepositoryTypeORM = new EstoqueRepositoryTypeORM()
    const deletarEstoqueService = new DeletarEstoqueService(estoqueRepositoryTypeORM)
    return new DeletarEstoqueController(makeDeletarEstoqueValidator(), deletarEstoqueService)
}