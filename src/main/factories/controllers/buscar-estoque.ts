import { BuscarEstoqueService } from "../../../data/services/buscar-produto"
import { EstoqueRepositoryTypeORM } from "../../../infra/estoque-repository"
import { BuscarEstoqueController } from "../../../presentation/controllers/buscar-estoque"
import { makeBuscarEstoqueValidator } from "../validators/buscar-estoque"

export const makeBuscarEstoqueController = (): BuscarEstoqueController => {
    const estoqueRepositoryTypeORM = new EstoqueRepositoryTypeORM()
    const buscarEstoqueService = new BuscarEstoqueService(estoqueRepositoryTypeORM)
    return new BuscarEstoqueController(makeBuscarEstoqueValidator(), buscarEstoqueService)
}