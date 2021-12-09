import { DeletarEstoqueUseCase } from "../../domain/useCases/deletar-estoque";
import { Validator } from "../../validation/contracts/validator";
import { AMQPRequest } from "../contracts/amqp";
import { Controller } from "../contracts/controller";

export class DeletarEstoqueController implements Controller {
    constructor (private readonly validator: Validator, private readonly deletarEstoqueUseCase: DeletarEstoqueUseCase) {}
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { id } = AMQPRequest.payload
        await this.deletarEstoqueUseCase.deletar(id)
    }
}