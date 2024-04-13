import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Organization } from './Organization'

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @ManyToOne(() => Organization, (organization) => organization.pets)
  organization!: Organization
}
