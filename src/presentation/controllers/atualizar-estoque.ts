import { AtualizarEstoqueUseCase } from "../../domain/useCases/atualizar-estoque"
import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { AMQPRequest } from "../contracts/amqp"


export class AtualizarEstoqueController implements Controller {
    constructor(private readonly validator: Validator, private readonly atualizarEstoqueUseCase: AtualizarEstoqueUseCase) { }
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { nome, id } = AMQPRequest.payload
        const result = await this.atualizarEstoqueUseCase.atualizar({
            id,
            nome
        })
        if (result instanceof Error) {
            throw result
        }
    }
}