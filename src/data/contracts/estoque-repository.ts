import { Estoque } from "../entities/estoque";

export interface EstoqueRepository {
    getAll: () => Promise<Estoque[]>
    create: (estoque: Estoque) => Promise<Estoque>
    update: (estoque: Estoque) => Promise<void>
    getById: (id: number) => Promise<Estoque>
    deleteById: (id: number) => Promise<void>
}