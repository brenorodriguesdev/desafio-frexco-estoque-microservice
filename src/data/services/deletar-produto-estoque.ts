import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { DeletarProdutoEstoqueUseCase } from "../../domain/useCases/deletar-produto-estoque"
import { AMQPClient } from "../contracts/amqp-client"
import { EstoqueRepository } from "../contracts/estoque-repository"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"

export class DeletarProdutoEstoqueService implements DeletarProdutoEstoqueUseCase {
    constructor (private readonly amqpClient: AMQPClient, private readonly estoqueRepository: EstoqueRepository, private readonly produtoEstoqueRepository: ProdutoEstoqueRepository) {}
    async deletar (data: AdicionarProdutoEstoqueModel): Promise<void | Error> {
        const produto = await this.amqpClient.send('buscar-produto', { id: data.idProduto })
        if (produto && produto['error']) {
            return new Error(produto['error'])
        }

        const estoque = await this.estoqueRepository.getById(data.idEstoque)
        if (!estoque) {
            return new Error('Esse estoque não foi encontrado!')
        }
        await this.produtoEstoqueRepository.delete({
            produto,
            estoque
        })
    }
}