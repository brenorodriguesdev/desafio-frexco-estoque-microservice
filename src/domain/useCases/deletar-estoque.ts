export interface DeletarEstoqueUseCase {
    deletar: (id: number) => Promise<void | Error>
}