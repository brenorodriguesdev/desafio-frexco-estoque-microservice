import { EstoqueModel } from "../../domain/models/estoque"
import { makeEstoqueRepository } from "../../tests/factories/repositories/estoque-repository"
import { EstoqueRepository } from "../contracts/estoque-repository"
import { AtualizarEstoqueService } from "./atualizar-estoque"

interface SutTypes {
    estoqueRepository: EstoqueRepository,
    sut: AtualizarEstoqueService
}


const makeSut = (): SutTypes => {
    const estoqueRepository = makeEstoqueRepository()
    const sut = new AtualizarEstoqueService(estoqueRepository)
    return {
        estoqueRepository,
        sut
    }
}

const makeData = (): EstoqueModel => ({
    id: 1,
    nome: 'any_nome',
})

describe('AtualizarEstoque Service', () => {

    test('Garantir que estoqueRepository getById seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const getByIdSpy = jest.spyOn(estoqueRepository, 'getById')
        await sut.atualizar(makeData())
        expect(getByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o estoqueRepository getById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o estoqueRepository getById retornar nullo retornar um error', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.atualizar(makeData())
        expect(error).toEqual(new Error('Esse estoque não foi encontrado!'))
    })


    test('Garantir que estoqueRepository update seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const createSpy = jest.spyOn(estoqueRepository, 'update')
        await sut.atualizar(makeData())
        expect(createSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o estoqueRepository update retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'update').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.atualizar(makeData())
        await expect(promise).rejects.toThrow()
    })

})