import { makeEstoque } from "../../tests/factories/entities/estoque"
import { makeEstoqueRepository } from "../../tests/factories/repositories/estoque-repository"
import { EstoqueRepository } from "../contracts/estoque-repository"
import { BuscarEstoqueService } from "./buscar-estoque"

interface SutTypes {
    estoqueRepository: EstoqueRepository,
    sut: BuscarEstoqueService
}


const makeSut = (): SutTypes => {
    const estoqueRepository = makeEstoqueRepository()
    const sut = new BuscarEstoqueService(estoqueRepository)
    return {
        estoqueRepository,
        sut
    }
}

describe('BuscarEstoque Service', () => {
    test('Garantir que estoqueRepository getById seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const getByIdSpy = jest.spyOn(estoqueRepository, 'getById')
        await sut.buscar(1)
        expect(getByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o estoqueRepository getById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.buscar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o estoqueRepository getById retornar nullo retornar um error', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.buscar(1)
        expect(error).toEqual(new Error('Esse estoque não foi encontrado!'))
    })

    test('Garantir que se o tudo ocorrer normalmente retornar o estoque', async () => {
        const { sut } = makeSut()
        const estoqueResponse = await sut.buscar(1)
        const estoque = makeEstoque(1)
        expect(estoqueResponse).toEqual(estoque)
    })
})