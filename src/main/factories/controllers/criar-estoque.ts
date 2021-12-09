import { CriarEstoqueService } from "../../../data/services/criar-estoque"
import { EstoqueRepositoryTypeORM } from "../../../infra/estoque-repository"
import { CriarEstoqueController } from "../../../presentation/controllers/criar-estoque"
import { makeCriarEstoqueValidator } from "../validators/criar-estoque"

export const makeCriarEstoqueController = (): CriarEstoqueController => {
    const estoqueRepositoryTypeORM = new EstoqueRepositoryTypeORM()
    const criarEstoqueService = new CriarEstoqueService(estoqueRepositoryTypeORM)
    return new CriarEstoqueController(makeCriarEstoqueValidator(), criarEstoqueService)
}