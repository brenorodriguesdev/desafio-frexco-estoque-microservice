import { ListarEstoquesUseCase } from "../../domain/useCases/listar-estoques";
import { Controller } from "../contracts/controller";

export class ListarEstoquesController implements Controller {
    constructor (private readonly listarEstoquesUseCase: ListarEstoquesUseCase) {}
    async handle(): Promise<any> {
        const estoques = await this.listarEstoquesUseCase.listar()
        return estoques
    }
}