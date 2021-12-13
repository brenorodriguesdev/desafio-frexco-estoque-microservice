import { AdicionarProdutoEstoqueModel } from "../models/adicionar-produto-estoque";

export interface DeletarProdutoEstoqueUseCase {
    deletar: (data: AdicionarProdutoEstoqueModel) => Promise<void | Error>
}