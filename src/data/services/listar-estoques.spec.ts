import { makeEstoque } from "../../tests/factories/entities/estoque"
import { makeEstoqueRepository } from "../../tests/factories/repositories/estoque-repository"
import { EstoqueRepository } from "../contracts/estoque-repository"
import { ListarEstoquesService } from "./listar-estoques"

interface SutTypes {
    estoqueRepository: EstoqueRepository,
    sut: ListarEstoquesService
}


const makeSut = (): SutTypes => {
    const estoqueRepository = makeEstoqueRepository()
    const sut = new ListarEstoquesService(estoqueRepository)
    return {
        estoqueRepository,
        sut
    }
}

describe('ListarEstoques Service', () => {
    test('Garantir que estoqueRepository getAll seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const getAllSpy = jest.spyOn(estoqueRepository, 'getAll')
        await sut.listar()
        expect(getAllSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o estoqueRepository getAll retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getAll').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar estoques', async () => {
        const { sut } = makeSut()
        const estoques = await sut.listar()
        expect(estoques).toEqual([makeEstoque(1), makeEstoque(2)])
    })
})