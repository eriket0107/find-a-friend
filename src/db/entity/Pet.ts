import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Size } from './@types/size'
import { Organization } from './Organization'

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('varchar')
  name!: string

  @Column('varchar')
  breed!: string

  @Column({ type: 'varchar', enum: Size, nullable: true })
  size!: string

  @Column('varchar')
  description!: string

  @Column('int')
  age!: number

  @Column('varchar')
  photo!: string

  @Column('varchar')
  traits!: string[]

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date

  @ManyToOne(() => Organization, (organization) => organization.pets, {
    onDelete: 'CASCADE',
  })
  organization?: Organization
}
