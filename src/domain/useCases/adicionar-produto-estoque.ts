import { AdicionarProdutoEstoqueModel } from "../models/adicionar-produto-estoque";

export interface AdicionarProdutoEstoqueUseCase {
    adicionar: (data: AdicionarProdutoEstoqueModel) => Promise<void | Error>
}