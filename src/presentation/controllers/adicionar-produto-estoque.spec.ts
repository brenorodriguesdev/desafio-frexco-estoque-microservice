import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { AdicionarProdutoEstoqueUseCase } from "../../domain/useCases/adicionar-produto-estoque"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { AdicionarProdutoEstoqueController } from "./adicionar-produto-estoque"

interface SutTypes {
    validator: Validator,
    adicionarProdutoEstoqueUseCase: AdicionarProdutoEstoqueUseCase,
    sut: AdicionarProdutoEstoqueController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeAdicionarProdutoEstoqueUseCase = (): AdicionarProdutoEstoqueUseCase => {
    class AdicionarProdutoEstoqueUseCaseStub implements AdicionarProdutoEstoqueUseCase {
        async adicionar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new AdicionarProdutoEstoqueUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const adicionarProdutoEstoqueUseCase = makeAdicionarProdutoEstoqueUseCase()
    const sut = new AdicionarProdutoEstoqueController(validator, adicionarProdutoEstoqueUseCase)
    return {
        validator,
        adicionarProdutoEstoqueUseCase,
        sut
    }
}

const makeData = (): AdicionarProdutoEstoqueModel => ({
    idProduto: 1,
    idEstoque: 1
})

const makeRequest = (): AMQPRequest => ({
    payload: makeData()
})

describe('AdicionarProdutoEstoque controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o validate retornar uma exceção repassará essa exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o validate retornar uma exceção', async () => {
        const { sut, validator } = makeSut()
        jest.spyOn(validator, 'validate').mockImplementationOnce(() => { return new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })


    test('Garantir que adicionar seja chamado com os valores corretos', async () => {
        const { sut, adicionarProdutoEstoqueUseCase } = makeSut()
        const deletarSpy = jest.spyOn(adicionarProdutoEstoqueUseCase, 'adicionar')
        await sut.handle(makeRequest())
        expect(deletarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o deletar retornar uma exceção repassará essa exceção', async () => {
        const { sut, adicionarProdutoEstoqueUseCase } = makeSut()
        jest.spyOn(adicionarProdutoEstoqueUseCase, 'adicionar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o adicionar uma error retornará uma exceção com esse error', async () => {
        const { sut, adicionarProdutoEstoqueUseCase } = makeSut()
        jest.spyOn(adicionarProdutoEstoqueUseCase, 'adicionar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })
})