import { Produto } from "../../../data/entities/produto"

export const makeProduto = (id: number): Produto => {
    const produto = new Produto()
    produto.id = id
    produto.nome = 'nome ' + id
    return produto
}