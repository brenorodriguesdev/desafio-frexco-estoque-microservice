import { ProdutoEstoque } from "../../../data/entities/produtoEstoque"
import { makeEstoque } from "./estoque"
import { makeProduto } from "./produto"

export const makeProdutoEstoque = (id: number): ProdutoEstoque => {
    const produtoEstoque = new ProdutoEstoque()
    produtoEstoque.id = id
    produtoEstoque.produto = makeProduto(1)
    produtoEstoque.estoque = makeEstoque(1)
    return produtoEstoque
}