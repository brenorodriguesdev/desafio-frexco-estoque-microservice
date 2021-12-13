import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  nome: string
}