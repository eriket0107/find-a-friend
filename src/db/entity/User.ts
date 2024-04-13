import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Address } from './Adress'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @Column({ type: 'varchar', unique: true })
  email!: string

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
  address!: Address
}
