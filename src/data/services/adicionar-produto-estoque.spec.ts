import { AdicionarProdutoEstoqueModel } from "../../domain/models/adicionar-produto-estoque"
import { makeEstoque } from "../../tests/factories/entities/estoque"
import { makeAMQPClient } from "../../tests/factories/repositories/amqp-client"
import { makeEstoqueRepository } from "../../tests/factories/repositories/estoque-repository"
import { makeProdutoEstoqueRepository } from "../../tests/factories/repositories/produtoEstoque-repository"
import { AMQPClient } from "../contracts/amqp-client"
import { EstoqueRepository } from "../contracts/estoque-repository"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"
import { AdicionarProdutoEstoqueService } from "./adicionar-produto-estoque"

interface SutTypes {
    amqpClient: AMQPClient
    estoqueRepository: EstoqueRepository,
    produtoEstoqueRepository: ProdutoEstoqueRepository
    sut: AdicionarProdutoEstoqueService
}


const makeSut = (): SutTypes => {
    const amqpClient = makeAMQPClient()
    const estoqueRepository = makeEstoqueRepository()
    const produtoEstoqueRepository = makeProdutoEstoqueRepository()

    const sut = new AdicionarProdutoEstoqueService(amqpClient, estoqueRepository, produtoEstoqueRepository)
    return {
        amqpClient,
        estoqueRepository,
        produtoEstoqueRepository,
        sut
    }
}

const makeData = (): AdicionarProdutoEstoqueModel => ({
    idEstoque: 1,
    idProduto: 1
})

describe('AdicionarProdutoEstoque Service', () => {
    test('Garantir que estoqueRepository getById seja chamado com os valores corretos', async () => {
        const { sut, estoqueRepository } = makeSut()
        const getByIdSpy = jest.spyOn(estoqueRepository, 'getById')
        await sut.adicionar(makeData())
        expect(getByIdSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o estoqueRepository getById retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.adicionar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o estoqueRepository getById retornar nullo retornar um error', async () => {
        const { sut, estoqueRepository } = makeSut()
        jest.spyOn(estoqueRepository, 'getById').mockReturnValueOnce(null)
        const error = await sut.adicionar(makeData())
        expect(error).toEqual(new Error('Esse estoque não foi encontrado!'))
    })

    test('Garantir que amqpClient send seja chamado com os valores corretos', async () => {
        const { sut, amqpClient } = makeSut()
        const getByIdSpy = jest.spyOn(amqpClient, 'send')
        await sut.adicionar(makeData())
        expect(getByIdSpy).toHaveBeenCalledWith('buscar-produto', { id: 1 })
    })

    test('Garantir que se o estoqueRepository amqpClient retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, amqpClient } = makeSut()
        jest.spyOn(amqpClient, 'send').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.adicionar(makeData())
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o amqpClient send retornar error retornar esse error', async () => {
        const { sut, amqpClient } = makeSut()
        jest.spyOn(amqpClient, 'send').mockResolvedValueOnce({ error: 'any_error' })
        const error = await sut.adicionar(makeData())
        expect(error).toEqual(new Error('any_error'))
    })

    test('Garantir que produtoEstoqueRepository create seja chamado com os valores corretos', async () => {
        const { sut, produtoEstoqueRepository } = makeSut()
        const createSpy = jest.spyOn(produtoEstoqueRepository, 'create')
        await sut.adicionar(makeData())
        expect(createSpy).toHaveBeenCalledWith({
            produto: {},
            estoque: makeEstoque(1)
        })
    })

    test('Garantir que se o produtoEstoqueRepository create retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoEstoqueRepository } = makeSut()
        jest.spyOn(produtoEstoqueRepository, 'create').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.adicionar(makeData())
        await expect(promise).rejects.toThrow()
    })
})