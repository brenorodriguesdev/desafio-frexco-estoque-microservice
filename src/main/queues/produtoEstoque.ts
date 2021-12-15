import { adaptQueue } from "../adapters/amqp-controller";
import { makeAdicionarProdutoEstoqueController } from "../factories/controllers/adicionar-produto-estoque";
import { makeDeletarProdutoEstoqueController } from "../factories/controllers/deletar-produto-estoque";
import { makeListarProdutoEstoquePorEstoqueController } from "../factories/controllers/listar-produto-estoque-por-estoque";

export default (channel: any): void => {
    channel.consume('adicionar-produtoEstoque', adaptQueue(channel, makeAdicionarProdutoEstoqueController()));
    channel.consume('deletar-produtoEstoque', adaptQueue(channel, makeDeletarProdutoEstoqueController()));
    channel.consume('listar-produtoEstoquePorEstoque', adaptQueue(channel, makeListarProdutoEstoquePorEstoqueController()));
}