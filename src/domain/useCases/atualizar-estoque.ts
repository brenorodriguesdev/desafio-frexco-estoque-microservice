import { EstoqueModel } from "../models/estoque";

export interface AtualizarEstoqueUseCase {
    atualizar: (data: EstoqueModel) => Promise<EstoqueModel | Error>
}