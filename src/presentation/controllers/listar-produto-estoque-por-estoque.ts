import { ListarProdutoEstoquePorEstoqueUseCase } from "../../domain/useCases/listar-produto-estoque-por-estoque";
import { Validator } from "../../validation/contracts/validator";
import { Controller } from "../contracts/controller";
import { AMQPRequest } from "../contracts/amqp"

export class ListarProdutoEstoquePorEstoqueController implements Controller {
    constructor (private readonly validator: Validator, private readonly listarProdutoEstoquePorEstoqueUseCase: ListarProdutoEstoquePorEstoqueUseCase) {}
    async handle(AMQPRequest: AMQPRequest): Promise<any> {
        const error = this.validator.validate(AMQPRequest.payload)
        if (error) {
            throw error
        }
        const { idEstoque } = AMQPRequest.payload
        const produtosEstoque = await this.listarProdutoEstoquePorEstoqueUseCase.listar(idEstoque)
        return produtosEstoque
    }
}