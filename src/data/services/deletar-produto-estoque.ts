import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { DeletarProdutoEstoqueUseCase } from "../../domain/useCases/deletar-produto-estoque"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"
import { Estoque } from "../entities/estoque"
import { Produto } from "../entities/produto"

export class DeletarProdutoEstoqueService implements DeletarProdutoEstoqueUseCase {
    constructor (private readonly produtoEstoqueRepository: ProdutoEstoqueRepository) {}
    async deletar (data: AdicionarProdutoEstoqueModel): Promise<void | Error> {
        const produto = new Produto()
        produto.id = data.idProduto
        const estoque = new Estoque()
        estoque.id = data.idEstoque
        await this.produtoEstoqueRepository.delete({
            produto,
            estoque
        })
    }
}