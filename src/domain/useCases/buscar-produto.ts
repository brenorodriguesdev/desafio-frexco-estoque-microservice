import { EstoqueModel } from "../models/estoque";

export interface BuscarProdutoUseCase {
    buscar: (id: number) => Promise<EstoqueModel | Error>
}