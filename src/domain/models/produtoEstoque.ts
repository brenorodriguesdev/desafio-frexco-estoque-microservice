import { EstoqueModel } from "./estoque";
import { ProdutoModel } from "./produto";

export interface ProdutoEstoqueModel {
    id?: number
    produto: ProdutoModel
    estoque: EstoqueModel
}