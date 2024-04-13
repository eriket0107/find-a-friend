import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Organization } from './Organization'
import { User } from './User'

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  street!: string

  @Column({ type: 'varchar' })
  city!: string

  @Column({ type: 'varchar' })
  state!: string

  @Column({ type: 'varchar' })
  postalCode!: string

  @Column({ type: 'varchar' })
  country!: string

  @OneToOne(() => User, (user) => user.address, { nullable: true })
  @JoinColumn()
  user!: User

  @OneToOne(() => Organization, (organization) => organization.address, {
    nullable: true,
  })
  @JoinColumn()
  organization!: Organization
}
