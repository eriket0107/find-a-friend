import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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

  @ManyToOne(() => Organization, (organization) => organization.pets)
  organization!: Organization
}
