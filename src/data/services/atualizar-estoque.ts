import { EstoqueModel } from "../../domain/models/estoque"
import { AtualizarEstoqueUseCase } from "../../domain/useCases/atualizar-estoque"
import { EstoqueRepository } from "../contracts/estoque-repository"

export class AtualizarEstoqueService implements AtualizarEstoqueUseCase {
    constructor (private readonly estoqueRepository: EstoqueRepository) {}
    async atualizar (data: EstoqueModel): Promise<void | Error> {
        const estoque = await this.estoqueRepository.getById(data.id)
        if (!estoque) {
            return new Error('Esse estoque não foi encontrado!')
        }
        await this.estoqueRepository.update(data)
    }
}