import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('estoque')
export class Estoque {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  nome: string
}