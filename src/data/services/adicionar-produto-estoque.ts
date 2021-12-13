import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { AdicionarProdutoEstoqueUseCase } from "../../domain/useCases/adicionar-produto-estoque"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"

export class AdicionarProdutoEstoqueService implements AdicionarProdutoEstoqueUseCase {
    constructor (private readonly produtoEstoqueRepository: ProdutoEstoqueRepository) {}
    async adicionar (data: AdicionarProdutoEstoqueModel): Promise<void | Error> {
        await this.produtoEstoqueRepository.create(data)
    }
}