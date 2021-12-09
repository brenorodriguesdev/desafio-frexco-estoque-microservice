import { DeletarEstoqueUseCase } from "../../domain/useCases/deletar-estoque"
import { EstoqueRepository } from "../contracts/estoque-repository"

export class DeletarEstoqueService implements DeletarEstoqueUseCase {
    constructor (private readonly estoqueRepository: EstoqueRepository) {}
    async deletar (id: number): Promise<void | Error> {
        const estoque = await this.estoqueRepository.getById(id)
        if (!estoque) {
            return new Error('Esse estoque não foi encontrado!')
        }
        await this.estoqueRepository.deleteById(id)
    }
}