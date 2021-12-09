import { EstoqueModel } from "../models/estoque";

export interface CriarEstoqueUseCase {
    criar: (data: EstoqueModel) => Promise<EstoqueModel | Error>
}