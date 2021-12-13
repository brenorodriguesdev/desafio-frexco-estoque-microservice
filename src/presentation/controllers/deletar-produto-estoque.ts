import { Validator } from "../../validation/contracts/validator"
import { Controller } from "../contracts/controller"
import { AMQPRequest } from "../contracts/amqp"
import { DeletarProdutoEstoqueUseCase } from "../../domain/useCases/deletar-produto-estoque"


export class DeletarProdutoEstoqueController implements Controller {
    constructor(private readonly validator: Validator, private readonly deletarProdutoEstoqueUseCase: DeletarProdutoEstoqueUseCase) { }
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { idProduto, idEstoque } = AMQPRequest.payload
        const result = await this.deletarProdutoEstoqueUseCase.deletar({
            idProduto,
            idEstoque
        })
        if (result instanceof Error) {
            throw result
        }
    }
}