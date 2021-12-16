import { makeProdutoEstoque } from "../../tests/factories/entities/produtoEstoque"
import { makeProdutoEstoqueRepository } from "../../tests/factories/repositories/produtoEstoque-repository"
import { ProdutoEstoqueRepository } from "../contracts/produtoEstoque-repository"
import { ListarProdutoEstoquePorEstoqueService } from "./listar-produto-estoque-por-estoque"

interface SutTypes {
    produtoEstoqueRepository: ProdutoEstoqueRepository,
    sut: ListarProdutoEstoquePorEstoqueService
}


const makeSut = (): SutTypes => {
    const produtoEstoqueRepository = makeProdutoEstoqueRepository()
    const sut = new ListarProdutoEstoquePorEstoqueService(produtoEstoqueRepository)
    return {
        produtoEstoqueRepository,
        sut
    }
}

describe('ListarProdutoEstoquePorEstoque Service', () => {
    test('Garantir que produtoEstoqueRepository findByEstoque seja chamado com os valores corretos', async () => {
        const { sut, produtoEstoqueRepository } = makeSut()
        const findByEstoqueSpy = jest.spyOn(produtoEstoqueRepository, 'findByEstoque')
        await sut.listar(1)
        expect(findByEstoqueSpy).toHaveBeenCalledWith(1)
    })

    test('Garantir que se o produtoEstoqueRepository findByEstoque retornar uma exceção o serviço repassará a exceção', async () => {
        const { sut, produtoEstoqueRepository } = makeSut()
        jest.spyOn(produtoEstoqueRepository, 'findByEstoque').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.listar(1)
        await expect(promise).rejects.toThrow()
    })

    test('Garantir que se o tudo ocorrer normalmente retornar produtos estoque', async () => {
        const { sut } = makeSut()
        const produtosEstoque = await sut.listar(1)
        expect(produtosEstoque).toEqual([makeProdutoEstoque(1), makeProdutoEstoque(2)])
    })
})