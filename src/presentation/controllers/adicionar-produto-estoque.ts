import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { AMQPRequest } from "../contracts/amqp"
import { AdicionarProdutoEstoqueUseCase } from "../../domain/useCases/adicionar-produto-estoque"


export class AdicionarProdutoEstoqueController implements Controller {
    constructor(private readonly validator: Validator, private readonly adicionarProdutoEstoqueUseCase: AdicionarProdutoEstoqueUseCase) { }
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { idProduto, idEstoque } = AMQPRequest.payload
        const result = await this.adicionarProdutoEstoqueUseCase.adicionar({
            idProduto,
            idEstoque
        })
        if (result instanceof Error) {
            throw result
        }
    }
}