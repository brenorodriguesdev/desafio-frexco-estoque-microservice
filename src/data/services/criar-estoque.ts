import { EstoqueModel } from "../../domain/models/estoque"
import { CriarEstoqueUseCase } from "../../domain/useCases/criar-estoque"
import { EstoqueRepository } from "../contracts/estoque-repository"

export class CriarEstoqueService implements CriarEstoqueUseCase {
    constructor (private readonly estoqueRepository: EstoqueRepository) {}
    async criar (data: EstoqueModel): Promise<EstoqueModel | Error> {
        return await this.estoqueRepository.create({
            nome: data.nome
        })
    }
}