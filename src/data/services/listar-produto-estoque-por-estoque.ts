import { ProdutoEstoqueModel } from "../../domain/models/produtoEstoque"
import { ListarProdutoEstoquePorEstoqueUseCase } from "../../domain/useCases/listar-produto-estoque-por-estoque"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"

export class ListarProdutoEstoquePorEstoqueService implements ListarProdutoEstoquePorEstoqueUseCase {
    constructor (private readonly produtoEstoqueRepository: ProdutoEstoqueRepository) {}
    async listar (idEstoque: number): Promise<ProdutoEstoqueModel[]> {
        const produtosEstoque = await this.produtoEstoqueRepository.findByEstoque(idEstoque)
        console.log(produtosEstoque)
        console.log(idEstoque)
        return produtosEstoque
    }
}