import { getRepository } from "typeorm"
import { EstoqueRepository } from "../data/contracts/estoque-repository"
import { Estoque } from "../data/entities/estoque"

export class EstoqueRepositoryTypeORM implements EstoqueRepository {
    async getAll (): Promise<Estoque[]> {
      const estoqueRepository = getRepository(Estoque)
      return await estoqueRepository.find()
    }
  
    async getById (id: number): Promise<Estoque> {
      const estoqueRepository = getRepository(Estoque)
      return await estoqueRepository.findOne(id)
    }
  
    async create (estoque: Estoque): Promise<Estoque> {
      const estoqueRepository = getRepository(Estoque)
      estoque.id = await estoqueRepository.count() + 1
  
      return await estoqueRepository.save(estoque)
    }
  
    async deleteById (id: number): Promise<void> {
      const estoqueRepository = getRepository(Estoque)
      await estoqueRepository.delete(id)
    }
  
    async update (estoque: Estoque): Promise<void> {
      const estoqueRepository = getRepository(Estoque)
      const { id } = estoque
      delete estoque.id
      await estoqueRepository.update({ id }, estoque)
    }
  }