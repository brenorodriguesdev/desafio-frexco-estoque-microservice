export interface AdicionarProdutoEstoqueUseCase {
    adicionar: (id: number) => Promise<void | Error>
}