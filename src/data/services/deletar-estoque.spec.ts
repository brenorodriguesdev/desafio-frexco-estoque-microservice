import { makeEstoqueRepository } from "../../tests/factories/repositories/estoque-repository"
import { EstoqueRepository } from "../contracts/estoque-repository"
import { DeletarEstoqueService } from "./deletar-estoque"

interface SutTypes {
    estoqueRepository: EstoqueRepository,
    sut: DeletarEstoqueService
}


const makeSut = (): SutTypes => {
    const estoqueRepository = makeEstoqueRepository()
    const sut = new DeletarEstoqueService(estoqueRepository)
    return {
        estoqueRepository,
        sut
    }
}


describe('DeletarEstoque Service', () => {
    test('Garantir que estoqueRepository getById seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const getByIdSpy = jest.spyOn(estoqueRepository, 'getById')
        await sut.deletar(1)
        expect(getByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o estoqueRepository getById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o estoqueRepository getById retornar nullo retornar um error', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.deletar(1)
        expect(error).toEqual(new Error('Esse estoque não foi encontrado!'))
    })

    test('Garantir que estoqueRepository deleteById seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const deleteByIdSpy = jest.spyOn(estoqueRepository, 'deleteById')
        await sut.deletar(1)
        expect(deleteByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o estoqueRepository deleteById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'deleteById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.deletar(1)
        await expect(promise).rejects.toThrow()
    })
})