import { Estoque } from "../../../data/entities/estoque"

export const makeEstoque = (id: number): Estoque => {
    const estoque = new Estoque()
    estoque.id = id
    estoque.nome = 'nome ' + id
    return estoque
}