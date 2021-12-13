import { ProdutoEstoque } from "../entities/produtoEstoque";

export interface ProdutoEstoqueRepository {
    findByEstoque: (idEstoque: number) => Promise<ProdutoEstoque[]>
    create: (produtoEstoque: ProdutoEstoque) => Promise<void>
    delete: (ProdutoEstoque: ProdutoEstoque) => Promise<void>
}