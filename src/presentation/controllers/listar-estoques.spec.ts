import { EstoqueModel } from "../../domain/models/estoque"
import { ListarEstoquesUseCase } from "../../domain/useCases/listar-estoques"
import { ListarEstoquesController } from "./listar-estoques"

interface SutTypes {
    listarProdutosUseCase: ListarEstoquesUseCase,
    sut: ListarEstoquesController
}

const makeEstoquesModel = (): EstoqueModel[] => (
    [{
        id: 1,
        nome: 'any_nome',
    }]
)

const makeListarEstoquesUseCase = (): ListarEstoquesUseCase => {
    class ListarEstoquesUseCaseStub implements ListarEstoquesUseCase {
        async listar(): Promise<EstoqueModel[]> {
            return new Promise(resolve => resolve(makeEstoquesModel()))
        }
    }
    return new ListarEstoquesUseCaseStub()
}

const makeSut = (): SutTypes => {
    const listarProdutosUseCase = makeListarEstoquesUseCase()
    const sut = new ListarEstoquesController(listarProdutosUseCase)
    return {
        listarProdutosUseCase,
        sut
    }
}

describe('ListarEstoques controller', () => {

    test('Garantir que listar seja chamado com os valores corretos', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        const listarSpy = jest.spyOn(listarProdutosUseCase, 'listar')
        await sut.handle()
        expect(listarSpy).toHaveBeenCalledWith()
    })

    test('Garantir que se o listar retornar uma exceção repassará essa exceção', async () => {
        const { sut, listarProdutosUseCase } = makeSut()
        jest.spyOn(listarProdutosUseCase, 'listar').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.handle()
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se tudo ocorrer normalmente retornar estoques', async () => {
        const { sut } = makeSut()
        const produtos = await sut.handle()
        expect(produtos).toEqual(makeEstoquesModel())
    })

})