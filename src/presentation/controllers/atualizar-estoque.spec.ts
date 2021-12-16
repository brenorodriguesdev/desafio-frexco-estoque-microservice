import { EstoqueModel } from "../../domain/models/estoque"
import { AtualizarEstoqueUseCase } from "../../domain/useCases/atualizar-estoque"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { AtualizarEstoqueController } from "./atualizar-estoque"

interface SutTypes {
    validator: Validator,
    atualizarEstoqueUseCase: AtualizarEstoqueUseCase,
    sut: AtualizarEstoqueController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeAtualizarEstoqueUseCase = (): AtualizarEstoqueUseCase => {
    class AtualizarEstoqueUseCaseStub implements AtualizarEstoqueUseCase {
        async atualizar(): Promise<void | Error> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new AtualizarEstoqueUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const atualizarEstoqueUseCase = makeAtualizarEstoqueUseCase()
    const sut = new AtualizarEstoqueController(validator, atualizarEstoqueUseCase)
    return {
        validator,
        atualizarEstoqueUseCase,
        sut
    }
}

const makeData = (): EstoqueModel => ({
    id: 1,
    nome: 'nome',
})

const makeRequest = (): AMQPRequest => ({
    payload: makeData()
})

describe('AtualizarEstoque controller', () => {
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


    test('Garantir que atualizar seja chamado com os valores corretos', async () => {
        const { sut, atualizarEstoqueUseCase } = makeSut()
        const atualizarSpy = jest.spyOn(atualizarEstoqueUseCase, 'atualizar')
        await sut.handle(makeRequest())
        expect(atualizarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o atualizar retornar uma exceção repassará essa exceção', async () => {
        const { sut, atualizarEstoqueUseCase } = makeSut()
        jest.spyOn(atualizarEstoqueUseCase, 'atualizar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o atualizar uma error retornará uma exceção com esse error', async () => {
        const { sut, atualizarEstoqueUseCase } = makeSut()
        jest.spyOn(atualizarEstoqueUseCase, 'atualizar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


})