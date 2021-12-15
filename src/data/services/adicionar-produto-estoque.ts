import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { AdicionarProdutoEstoqueUseCase } from "../../domain/useCases/adicionar-produto-estoque"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"
import { Estoque } from "../entities/estoque"
import { Produto } from "../entities/produto"

export class AdicionarProdutoEstoqueService implements AdicionarProdutoEstoqueUseCase {
    constructor (private readonly produtoEstoqueRepository: ProdutoEstoqueRepository) {}
    async adicionar (data: AdicionarProdutoEstoqueModel): Promise<void | Error> {
        const produto = new Produto()
        produto.id = data.idProduto
        const estoque = new Estoque()
        estoque.id = data.idEstoque
        await this.produtoEstoqueRepository.create({
            produto,
            estoque
        })
    }
}