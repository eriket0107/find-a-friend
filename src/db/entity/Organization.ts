import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Address } from './Address'

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('varchar')
  name!: string

  @Column('varchar')
  phone!: string

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address!: Address
}
