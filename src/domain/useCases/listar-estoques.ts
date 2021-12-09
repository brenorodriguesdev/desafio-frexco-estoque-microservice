import { EstoqueModel } from "../models/estoque";

export interface ListarEstoquesUseCase {
    listar: () => Promise<EstoqueModel[]>
}