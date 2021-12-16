import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { DeletarProdutoEstoqueUseCase } from "../../domain/useCases/deletar-produto-estoque"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { DeletarProdutoEstoqueController } from "./deletar-produto-estoque"

interface SutTypes {
    validator: Validator,
    deletarProdutoEstoqueUseCase: DeletarProdutoEstoqueUseCase,
    sut: DeletarProdutoEstoqueController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarProdutoEstoqueUseCase = (): DeletarProdutoEstoqueUseCase => {
    class DeletarProdutoEstoqueUseCaseStub implements DeletarProdutoEstoqueUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarProdutoEstoqueUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarProdutoEstoqueUseCase = makeDeletarProdutoEstoqueUseCase()
    const sut = new DeletarProdutoEstoqueController(validator, deletarProdutoEstoqueUseCase)
    return {
        validator,
        deletarProdutoEstoqueUseCase,
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

describe('DeletarProdutoEstoque controller', () => {
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


    test('Garantir que deletar seja chamado com os valores corretos', async () => {
        const { sut, deletarProdutoEstoqueUseCase } = makeSut()
        const deletarSpy = jest.spyOn(deletarProdutoEstoqueUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(deletarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o deletar retornar uma exceção repassará essa exceção', async () => {
        const { sut, deletarProdutoEstoqueUseCase } = makeSut()
        jest.spyOn(deletarProdutoEstoqueUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o adicionar uma error retornará uma exceção com esse error', async () => {
        const { sut, deletarProdutoEstoqueUseCase } = makeSut()
        jest.spyOn(deletarProdutoEstoqueUseCase, 'deletar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })
})