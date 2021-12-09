import { EstoqueModel } from "../../domain/models/estoque"
import { ListarEstoquesUseCase } from "../../domain/useCases/listar-estoques"
import { EstoqueRepository } from "../contracts/estoque-repository"

export class ListarEstoquesService implements ListarEstoquesUseCase {
    constructor (private readonly estoqueRepository: EstoqueRepository) {}
    async listar (): Promise<EstoqueModel[]> {
        return await this.estoqueRepository.getAll()
    }
}