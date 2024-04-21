import { Repository } from 'typeorm'

import { dataSource } from '@/db/data-source'
import { Organization } from '@/db/entity/Organization'

import { OrganizationRepository } from '../organization-repository'

export class TypeOrmOrganizationRepostory implements OrganizationRepository {
  private repository: Repository<Organization>

  constructor() {
    this.repository = dataSource.getRepository(Organization)
  }

  async create(data: Organization): Promise<Organization> {
    const organization = await this.repository.save(data)

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await this.repository.findOne({ where: { id } })

    return organization
  }
}
