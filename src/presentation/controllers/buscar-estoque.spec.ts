import { EstoqueModel } from "../../domain/models/estoque"
import { BuscarEstoqueUseCase } from "../../domain/useCases/buscar-estoque"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { BuscarEstoqueController } from "./buscar-estoque"

interface SutTypes {
    validator: Validator,
    buscarEstoqueUseCase: BuscarEstoqueUseCase,
    sut: BuscarEstoqueController
}

const makeValidator = (): Validator => {
    class ValidatorStub implements Validator {
        validate(): Error {
            return null
        }
    }
    return new ValidatorStub()
}

const makeEstoqueModel = (): EstoqueModel => ({
    id: 1,
    nome: 'any_nome',
})

const makeBuscarEstoqueUseCase = (): BuscarEstoqueUseCase => {
    class BuscarEstoqueUseCaseStub implements BuscarEstoqueUseCase {
        async buscar(): Promise<EstoqueModel | Error> {
            return new Promise(resolve => resolve(makeEstoqueModel()))
        }
    }
    return new BuscarEstoqueUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const buscarEstoqueUseCase = makeBuscarEstoqueUseCase()
    const sut = new BuscarEstoqueController(validator, buscarEstoqueUseCase)
    return {
        validator,
        buscarEstoqueUseCase,
        sut
    }
}

const makeRequest = (): AMQPRequest => ({
    payload: { id: 1 },
})

describe('BuscarEstoque controller', () => {
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


    test('Garantir que buscar seja chamado com os valores corretos', async () => {
        const { sut, buscarEstoqueUseCase } = makeSut()
        const buscarSpy = jest.spyOn(buscarEstoqueUseCase, 'buscar')
        await sut.handle(makeRequest())
        expect(buscarSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o buscar retornar uma exceção repassará essa exceção', async () => {
        const { sut, buscarEstoqueUseCase } = makeSut()
        jest.spyOn(buscarEstoqueUseCase, 'buscar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o buscar uma error retornará uma exceção com esse error', async () => {
        const { sut, buscarEstoqueUseCase } = makeSut()
        jest.spyOn(buscarEstoqueUseCase, 'buscar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar um estoque', async () => {
        const { sut } = makeSut()
        const estoque = await sut.handle(makeRequest())
        expect(estoque).toEqual(makeEstoqueModel())
    })

})