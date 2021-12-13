import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('produtoEstoque')
export class ProdutoEstoque {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  idProduto: number

  @Column()
  idEstoque: number
}