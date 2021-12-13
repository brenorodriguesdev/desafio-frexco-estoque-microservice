import { getRepository } from "typeorm"
import { ProdutoEstoqueRepository } from "../data/contracts/produtoEstoque-repository"
import { ProdutoEstoque } from "../data/entities/produtoEstoque"

export class ProdutoEstoqueRepositoryTypeORM implements ProdutoEstoqueRepository {

    async findByEstoque(idEstoque: number): Promise<ProdutoEstoque[]> {
        const produtoEstoqueRepository = getRepository(ProdutoEstoque)
        return await produtoEstoqueRepository.find({ where: { estoque: { id: idEstoque } }, relations: ['produto'] })
    }

    async create(produtoEstoque: ProdutoEstoque): Promise<void> {
        const produtoEstoqueRepository = getRepository(ProdutoEstoque)
        produtoEstoque.id = await produtoEstoqueRepository.count() + 1

        await produtoEstoqueRepository.save(produtoEstoque)
    }

    async delete(produtoEstoque: ProdutoEstoque): Promise<void> {
        const produtoEstoqueRepository = getRepository(ProdutoEstoque)
        await produtoEstoqueRepository.delete(produtoEstoque)
    }

}