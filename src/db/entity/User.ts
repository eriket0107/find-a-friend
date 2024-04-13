import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Address } from './Address'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', unique: true })
  email!: string

  @Column({ type: 'varchar', unique: true })
  cpf!: string

  @Column('varchar')
  firstName!: string

  @Column({ type: 'varchar', default: null })
  lastName!: string

  @Column({ type: 'varchar' })
  phone!: string

  @Column({
    type: 'date',
    default: new Date().toISOString(),
  })
  date!: Date

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address!: Address
}
