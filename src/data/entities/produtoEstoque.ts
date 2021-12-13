import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Estoque } from './estoque'
import { Produto } from './produto'

@Entity('produtoEstoque')
export class ProdutoEstoque {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @OneToOne(() => Produto)
  @JoinColumn({ name: 'idProduto' })
  produto: Produto

  @OneToOne(() => Estoque)
  @JoinColumn({ name: 'idEstoque' })
  estoque: Estoque
}