import { EstoqueModel } from "../models/estoque";

export interface BuscarEstoqueUseCase {
    buscar: (id: number) => Promise<EstoqueModel | Error>
}