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

import { Roles } from './@types/roles'
import { Address } from './Address'
import { Pet } from './Pet'

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'varchar', unique: true })
  name!: string

  @Column({ type: 'varchar', unique: true })
  email!: string

  @Column({ type: 'varchar', unique: true })
  password!: string

  @Column({ type: 'varchar', unique: true, length: 14 })
  cnpj!: string

  @Column({ type: 'varchar' })
  whatsapp?: string

  @Column({ type: 'varchar', length: 11 })
  phone!: string

  @Column({ type: 'varchar', default: [Roles.ORG], enum: Roles })
  role?: Roles

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @OneToOne(() => Address, { cascade: true, onDelete: 'CASCADE', eager: false })
  @JoinColumn()
  address!: Address

  @OneToMany(() => Pet, (pet) => pet.organization)
  pets?: Pet[]
}
