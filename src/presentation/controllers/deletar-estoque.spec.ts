import { DeletarEstoqueUseCase } from "../../domain/useCases/deletar-estoque"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { DeletarEstoqueController } from "./deletar-estoque"

interface SutTypes {
    validator: Validator,
    deletarEstoqueUseCase: DeletarEstoqueUseCase,
    sut: DeletarEstoqueController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeDeletarEstoqueUseCase = (): DeletarEstoqueUseCase => {
    class DeletarEstoqueUseCaseStub implements DeletarEstoqueUseCase {
        async deletar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new DeletarEstoqueUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const deletarEstoqueUseCase = makeDeletarEstoqueUseCase()
    const sut = new DeletarEstoqueController(validator, deletarEstoqueUseCase)
    return {
        validator,
        deletarEstoqueUseCase,
        sut
    }
}

const makeRequest = (): AMQPRequest => ({
    payload: { id: 1 }
})

describe('DeletarEstoque controller', () => {
    test('Garantir que validate seja chamado com os valores corretos', async () => {
        const { sut, validator } = makeSut()
        const validateSpy = jest.spyOn(validator, 'validate')
        await sut.handle(makeRequest())
        expect(validateSpy).toHaveBeenCalledWith({ id: 1 })
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
        const { sut, deletarEstoqueUseCase } = makeSut()
        const deletarSpy = jest.spyOn(deletarEstoqueUseCase, 'deletar')
        await sut.handle(makeRequest())
        expect(deletarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o deletar retornar uma exceção repassará essa exceção', async () => {
        const { sut, deletarEstoqueUseCase } = makeSut()
        jest.spyOn(deletarEstoqueUseCase, 'deletar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o deletar uma error retornará uma exceção com esse error', async () => {
        const { sut, deletarEstoqueUseCase } = makeSut()
        jest.spyOn(deletarEstoqueUseCase, 'deletar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })
})