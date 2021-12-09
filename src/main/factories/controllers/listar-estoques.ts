import { ListarEstoquesService } from "../../../data/services/listar-estoques"
import { EstoqueRepositoryTypeORM } from "../../../infra/estoque-repository"
import { ListarEstoquesController } from "../../../presentation/controllers/listar-estoques"

export const makeListarEstoquesController = (): ListarEstoquesController => {
    const estoqueRepositoryTypeORM = new EstoqueRepositoryTypeORM()
    const listarEstoquesService = new ListarEstoquesService(estoqueRepositoryTypeORM)
    return new ListarEstoquesController(listarEstoquesService)
}