import { ProdutoEstoqueRepository } from "../../../data/contracts/produtoEstoque-repository"
import { ProdutoEstoque } from "../../../data/entities/produtoEstoque"
import { makeProdutoEstoque } from "../entities/produtoEstoque"

export const makeProdutoEstoqueRepository = (): ProdutoEstoqueRepository => {
    class ProdutoEstoqueRepositoryStub implements ProdutoEstoqueRepository {
        async delete(produtoEstoque: ProdutoEstoque): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async findByEstoque(): Promise<ProdutoEstoque[]> {
            return new Promise(resolve => resolve([makeProdutoEstoque(1), makeProdutoEstoque(2)]))
        }

        async create(produtoEstoque: ProdutoEstoque): Promise<void> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new ProdutoEstoqueRepositoryStub()
}