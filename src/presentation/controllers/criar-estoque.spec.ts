import { EstoqueModel } from "../../domain/models/estoque"
import { ProdutoModel } from "../../domain/models/produto"
import { CriarEstoqueUseCase } from "../../domain/useCases/criar-estoque"
import { Validator } from "../../validation/contracts/validator"
import { AMQPRequest } from "../contracts/amqp"
import { CriarEstoqueController } from "./criar-estoque"

interface SutTypes {
    validator: Validator,
    criarEstoqueUseCase: CriarEstoqueUseCase,
    sut: CriarEstoqueController
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


const makeCriarEstoqueUseCase = (): CriarEstoqueUseCase => {
    class CriarEstoqueUseCaseStub implements CriarEstoqueUseCase {
        async criar(): Promise<ProdutoModel | Error> {
            return new Promise(resolve => resolve(makeEstoqueModel()))
        }
    }
    return new CriarEstoqueUseCaseStub()
}

const makeSut = (): SutTypes => {
    const validator = makeValidator()
    const criarEstoqueUseCase = makeCriarEstoqueUseCase()
    const sut = new CriarEstoqueController(validator, criarEstoqueUseCase)
    return {
        validator,
        criarEstoqueUseCase,
        sut
    }
}

const makeData = (): EstoqueModel => ({
   nome: 'any_nome',
})

const makeRequest = (): AMQPRequest => ({
    payload: makeData(),
})

describe('CriarEstoque controller', () => {
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


    test('Garantir que criar seja chamado com os valores corretos', async () => {
        const { sut, criarEstoqueUseCase } = makeSut()
        const criarSpy = jest.spyOn(criarEstoqueUseCase, 'criar')
        await sut.handle(makeRequest())
        expect(criarSpy).toHaveBeenCalledWith(makeData())
    })

    test('Garantir que se o criar retornar uma exceção repassará essa exceção', async () => {
        const { sut, criarEstoqueUseCase } = makeSut()
        jest.spyOn(criarEstoqueUseCase, 'criar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o criar uma error retornará uma exceção com esse error', async () => {
        const { sut, criarEstoqueUseCase } = makeSut()
        jest.spyOn(criarEstoqueUseCase, 'criar').mockResolvedValueOnce(new Error())
        const promise = sut.handle(makeRequest())
        await expect(promise).rejects.toEqual(new Error())
    })


    test('Garantir que se tudo ocorrer normalmente retornar um estoque', async () => {
        const { sut } = makeSut()
        const estoque = await sut.handle(makeRequest())
        expect(estoque).toEqual(makeEstoqueModel())
    })

})