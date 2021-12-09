import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { AMQPRequest } from "../contracts/amqp"
import { CriarEstoqueUseCase } from "../../domain/useCases/criar-estoque"


export class CriarEstoqueController implements Controller {
    constructor(private readonly validator: Validator, private readonly criarEstoqueUseCase: CriarEstoqueUseCase) { }
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { nome } = AMQPRequest.payload
        const estoque = await this.criarEstoqueUseCase.criar({
            nome
        })
        return estoque
    }
}