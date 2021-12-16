import { createConnection, getRepository, getConnection } from 'typeorm'
import { Estoque } from '../data/entities/estoque'
import { EstoqueRepositoryTypeORM } from './estoque-repository'

const makeSut = (): EstoqueRepositoryTypeORM => {
    return new EstoqueRepositoryTypeORM()
}

describe('EstoqueRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        const estoqueRepository = getRepository(Estoque)
        const estoques = await estoqueRepository.find()
        await estoqueRepository.remove(estoques)
        await getConnection().close();
    })

    beforeEach(async () => {
        const estoqueRepository = getRepository(Estoque)
        const estoques = await estoqueRepository.find()
        await estoqueRepository.remove(estoques)
    })

    test('Garantir que a estoque seja criado', async () => {
        const sut = makeSut()

        const estoque = await sut.create({
            nome: 'nome',
        })

        expect(estoque.id).toBeTruthy()
        expect(estoque.nome).toBe('nome')
  

    })


    test('Garantir que o estoque seja retornado', async () => {
        const sut = makeSut()

        const estoqueCreated = await sut.create({
            nome: 'nome',
        })


        const estoque = await sut.getById(estoqueCreated.id)

        expect(estoque.id).toBe(estoqueCreated.id)
        expect(estoque.nome).toBe('nome')


    })

    test('Garantir que os estoques sejam retornados', async () => {
        const sut = makeSut()

        const estoqueCreated = await sut.create({
            nome: 'nome',
        })


        const estoques = await sut.getAll()

        const estoque = estoques[0]

        expect(estoque.id).toBe(estoqueCreated.id)
        expect(estoque.nome).toBe('nome')

    })

    test('Garantir que o estoque seja deletado', async () => {
        const sut = makeSut()

        const estoqueCreated = await sut.create({
            nome: 'nome',
        })

        await sut.deleteById(estoqueCreated.id)
        const estoque = await sut.getById(estoqueCreated.id)

        expect(estoque).toBeUndefined()

    })

    test('Garantir que o estoque seja atualizado', async () => {
        const sut = makeSut()

        const estoqueCreated = await sut.create({
            nome: 'nome',
        })

        const id = estoqueCreated.id
        estoqueCreated.nome = 'outro_nome'
        await sut.update(estoqueCreated)
        const estoque = await sut.getById(id)
        expect(estoque.id).toBe(id)
        expect(estoque.nome).toBe('outro_nome')
    })

})