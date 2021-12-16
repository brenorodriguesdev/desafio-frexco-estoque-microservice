import { ProdutoEstoqueModel } from "../../domain/models/produtoEstoque"
import { ListarProdutoEstoquePorEstoqueUseCase } from "../../domain/useCases/listar-produto-estoque-por-estoque"
import { makeEstoque } from "../../tests/factories/entities/estoque"
import { makeProduto } from "../../tests/factories/entities/produto"
import { Validator } from "../../validation/contracts/validator"
import { ListarProdutoEstoquePorEstoqueController } from "./listar-produto-estoque-por-estoque"

interface SutTypes {
    validator: Validator
    listarProdutoEstoquePorEstoqueUseCase: ListarProdutoEstoquePorEstoqueUseCase,
    sut: ListarProdutoEstoquePorEstoqueController
}

const makeProdutosEstoqueModel = (): ProdutoEstoqueModel[] => (
    [{
        id: 1,
        produto: makeProduto(1),
        estoque: makeEstoque(1)
    }]
)

const makeListarProdutoEstoquePorEstoqueUseCase = (): ListarProdutoEstoquePorEstoqueUseCase => {
    class ListarEstoquesUseCaseStub implements ListarProdutoEstoquePorEstoqueUseCase {
        async listar(): Promise<ProdutoEstoqueModel[]> {
            return new Promise(resolve => resolve(makeProdutosEstoqueModel()))
        }
    }
    return new ListarEstoquesUseCaseStub()
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const listarProdutoEstoquePorEstoqueUseCase = makeListarProdutoEstoquePorEstoqueUseCase()
    const sut = new ListarProdutoEstoquePorEstoqueController(validator, listarProdutoEstoquePorEstoqueUseCase)
    return {
        validator,
        listarProdutoEstoquePorEstoqueUseCase,
        sut
    }
}

describe('listarProdutoEstoquePorEstoque controller', () => {

    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle({ payload: { idEstoque: 1 } })
        expect(validateSpy).toHaveBeenCalledWith({ idEstoque: 1 })
    })

    test('Garantir que se o validate retornar uma exceção repassará essa exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle({ payload: { idEstoque: 1 } })
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o validate retornar uma exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const promise = sut.handle({ payload: { idEstoque: 1 } })
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarProdutoEstoquePorEstoqueUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarProdutoEstoquePorEstoqueUseCase, 'listar')
        await sut.handle({ payload: { idEstoque: 1 } })
        expect(listarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o listar retornar uma exceção repassará essa exceção', async () => {
        const { sut, listarProdutoEstoquePorEstoqueUseCase } = makeSut()
        jest.spyOn(listarProdutoEstoquePorEstoqueUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle({ payload: { idEstoque: 1 } })
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se tudo ocorrer normalmente retornar produtos estoque', async () => {
        const { sut } = makeSut()
        const produtosEstoque = await sut.handle({ payload: { idEstoque: 1 } })
        expect(produtosEstoque).toEqual(makeProdutosEstoqueModel())
    })

})