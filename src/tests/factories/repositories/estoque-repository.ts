import { EstoqueRepository } from "../../../data/contracts/estoque-repository"
import { Estoque } from "../../../data/entities/estoque"
import { makeEstoque } from "../entities/estoque"

export const makeEstoqueRepository = (): EstoqueRepository => {
    class EstoqueRepositoryStub implements EstoqueRepository {
        async deleteById(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async update(): Promise<void> {
            return new Promise(resolve => resolve(null))
        }

        async getById(): Promise<Estoque> {
            return new Promise(resolve => resolve(makeEstoque(1)))
        }

        async getAll(): Promise<Estoque[]> {
            return new Promise(resolve => resolve([makeEstoque(1), makeEstoque(2)]))
        }

        async create(): Promise<Estoque> {
            return new Promise(resolve => resolve(makeEstoque(1)))
        }
    }
    return new EstoqueRepositoryStub()
}