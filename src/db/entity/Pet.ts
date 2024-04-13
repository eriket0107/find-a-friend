import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('varchar')
  name!: string

  @Column('varchar')
  breed!: string

  @Column('varchar')
  description!: string

  @Column('int')
  age!: number

  @Column('varchar')
  photo!: string
}