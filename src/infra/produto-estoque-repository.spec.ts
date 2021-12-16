import { createConnection, getRepository, getConnection } from 'typeorm'
import { Estoque } from '../data/entities/estoque'
import { Produto } from '../data/entities/produto'
import { ProdutoEstoque } from '../data/entities/produtoEstoque'
import { makeEstoque } from '../tests/factories/entities/estoque'
import { makeProduto } from '../tests/factories/entities/produto'
import { ProdutoEstoqueRepositoryTypeORM } from './produto-estoque-repository'

const makeSut = (): ProdutoEstoqueRepositoryTypeORM => {
    return new ProdutoEstoqueRepositoryTypeORM()
}

describe('ProdutoEstoqueRepository', () => {

    beforeAll(async () => {
        await createConnection()
    })

    afterAll(async () => {
        const produtoEstoqueRepository = getRepository(ProdutoEstoque)
        const produtosEstoque = await produtoEstoqueRepository.find()
        await produtoEstoqueRepository.remove(produtosEstoque)

        const estoqueRepository = getRepository(Estoque)
        const estoques = await estoqueRepository.find()
        await estoqueRepository.remove(estoques)
        
        const produtoRepository = getRepository(Produto)
        const produtos = await produtoRepository.find()
        await produtoRepository.remove(produtos)
        
        await getConnection().close();
    })

    beforeEach(async () => {
        const produtoEstoqueRepository = getRepository(ProdutoEstoque)
        const produtosEstoque = await produtoEstoqueRepository.find()
        await produtoEstoqueRepository.remove(produtosEstoque)

        const estoqueRepository = getRepository(Estoque)
        const estoques = await estoqueRepository.find()
        await estoqueRepository.remove(estoques)
        
        const produtoRepository = getRepository(Produto)
        const produtos = await produtoRepository.find()
        await produtoRepository.remove(produtos)
    })

    test('Garantir que a produto estoque seja criado', async () => {
        const sut = makeSut()

        const produto = makeProduto(1)
        const estoque = makeEstoque(1)
        produto.idCategoria = 1

        const estoqueRepository = getRepository(Estoque)
        await estoqueRepository.save(estoque)
        
        const produtoRepository = getRepository(Produto)
        await produtoRepository.save(produto)

        await sut.create({
            produto,
            estoque
        })

        const produtoEstoqueRepository = getRepository(ProdutoEstoque)
        const produtosEstoque = await produtoEstoqueRepository.find()
        expect(produtosEstoque.length).toBe(1)

    })


    test('Garantir que os produtos estoque sejam retornados', async () => {
        const sut = makeSut()

        const produto = makeProduto(1)
        const estoque = makeEstoque(1)
        produto.idCategoria = 1

        const estoqueRepository = getRepository(Estoque)
        await estoqueRepository.save(estoque)
        
        const produtoRepository = getRepository(Produto)
        await produtoRepository.save(produto)

        await sut.create({
            produto,
            estoque
        })


        const produtosEstoque = await sut.findByEstoque(1)
        expect(produtosEstoque.length).toBe(1)
    })

    test('Garantir que o produto estoque seja deletado', async () => {
        const sut = makeSut()

        const produto = makeProduto(1)
        const estoque = makeEstoque(1)
        produto.idCategoria = 1

        const estoqueRepository = getRepository(Estoque)
        await estoqueRepository.save(estoque)
        
        const produtoRepository = getRepository(Produto)
        await produtoRepository.save(produto)
        
        await sut.create({
            produto,
            estoque
        })

        await sut.delete({
            produto,
            estoque
        })
        
        const produtoEstoqueRepository = getRepository(ProdutoEstoque)
        const produtosEstoque = await produtoEstoqueRepository.find()
        expect(produtosEstoque.length).toBe(0)

    })
})