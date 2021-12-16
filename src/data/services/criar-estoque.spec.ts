import { EstoqueModel } from "../../domain/models/estoque"
import { makeEstoque } from "../../tests/factories/entities/estoque"
import { makeEstoqueRepository } from "../../tests/factories/repositories/estoque-repository"
import { EstoqueRepository } from "../contracts/estoque-repository"
import { CriarEstoqueService } from "./criar-estoque"

interface SutTypes {
    estoqueRepository: EstoqueRepository,
    sut: CriarEstoqueService
}


const makeSut = (): SutTypes => {
    const estoqueRepository = makeEstoqueRepository()
    const sut = new CriarEstoqueService(estoqueRepository)
    return {
        estoqueRepository,
        sut
    }
}

const makeData = (): EstoqueModel => ({
    nome: 'any_nome'
})

describe('CriarEstoque Service', () => {
    test('Garantir que estoqueRepository create seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const createSpy = jest.spyOn(estoqueRepository, 'create')
        await sut.criar(makeData())
        expect(createSpy).toHaveBeenCalledWith({
            nome: 'any_nome'
        })
    })

    test('Garantir que se o estoqueRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.criar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar o estoque', async () => {
        const { sut } = makeSut()
        const estoqueResponse = await sut.criar(makeData())
        const estoque = makeEstoque(1)
        expect(estoqueResponse).toEqual(estoque)
    })
})