import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { DeletarProdutoEstoqueUseCase } from "../../domain/useCases/deletar-produto-estoque"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"

export class DeletarProdutoEstoqueService implements DeletarProdutoEstoqueUseCase {
    constructor (private readonly produtoEstoqueRepository: ProdutoEstoqueRepository) {}
    async deletar (data: AdicionarProdutoEstoqueModel): Promise<void | Error> {
        await this.produtoEstoqueRepository.delete(data)
    }
}