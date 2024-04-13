import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Address } from './Address'
import { Pet } from './Pet'

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', unique: true })
  name!: string

  @Column({ type: 'varchar', unique: true })
  cnpj!: string

  @Column('varchar')
  phone!: string

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address!: Address

  @OneToMany(() => Pet, (pets) => pets.id)
  @JoinColumn()
  pets!: Pet[]
}
