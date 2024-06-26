import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Roles } from './@types/roles'
import { Address } from './Address'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'varchar', unique: true })
  email!: string

  @Column({ type: 'varchar', unique: true, length: 11 })
  cpf!: string

  @Column('varchar')
  firstName!: string

  @Column({ type: 'varchar' })
  lastName?: string

  @Column({ type: 'varchar' })
  phone!: string

  @Column({ type: 'varchar', default: [Roles.USER], enum: Roles })
  role?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address!: Address
}
