import { adaptQueue } from "../adapters/amqp-controller";
import { makeAtualizarEstoqueController } from "../factories/controllers/atualizar-estoque";
import { makeCriarEstoqueController } from "../factories/controllers/criar-estoque";
import { makeDeletarEstoqueController } from "../factories/controllers/deletar-estoque";
import { makeListarEstoquesController } from "../factories/controllers/listar-estoques";

export default (channel: any): void => {
    channel.consume('criar-estoque', adaptQueue(channel, makeCriarEstoqueController()));
    channel.consume('atualizar-estoque', adaptQueue(channel, makeAtualizarEstoqueController()));
    channel.consume('deletar-estoque', adaptQueue(channel, makeDeletarEstoqueController()));
    channel.consume('listar-estoques', adaptQueue(channel, makeListarEstoquesController()));
}