import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Address } from './Address'
import { Pet } from './Pet'

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'varchar', unique: true })
  name!: string

  @Column({ type: 'varchar', unique: true, length: 14 })
  cnpj!: string

  @Column('varchar')
  phone!: string

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address!: Address

  @OneToMany(() => Pet, (pet) => pet.organization)
  pets?: Pet[]
}
