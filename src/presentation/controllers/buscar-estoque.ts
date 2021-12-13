import { BuscarEstoqueUseCase } from "../../domain/useCases/buscar-estoque";
import { Validator } from "../../validation/contracts/validator";
import { AMQPRequest } from "../contracts/amqp";
import { Controller } from "../contracts/controller";

export class BuscarEstoqueController implements Controller {
    constructor (private readonly validator: Validator, private readonly buscarEstoqueUseCase: BuscarEstoqueUseCase) {}
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { id } = AMQPRequest.payload
        const result = await this.buscarEstoqueUseCase.buscar(id)
        if (result instanceof Error) {
            throw result
        }
    }
}