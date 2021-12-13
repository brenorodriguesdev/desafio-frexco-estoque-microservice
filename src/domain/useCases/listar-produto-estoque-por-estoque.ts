import { ProdutoEstoqueModel } from "../models/produtoEstoque";

export interface ListarProdutoEstoquePorEstoqueUseCase {
    listar: (idEstoque: number) => Promise<ProdutoEstoqueModel[]>
}