import { EstoqueModel } from "../../domain/models/estoque"
import { BuscarEstoqueUseCase } from "../../domain/useCases/buscar-estoque"
import { EstoqueRepository } from "../contracts/estoque-repository"

export class BuscarEstoqueService implements BuscarEstoqueUseCase {
    constructor (private readonly estoqueRepository: EstoqueRepository) {}
    async buscar (id: number): Promise<EstoqueModel | Error> {
        const estoque = await this.estoqueRepository.getById(id)
        if (!estoque) {
            return new Error('Esse estoque não foi encontrado!')
        }
        return estoque
    }
}