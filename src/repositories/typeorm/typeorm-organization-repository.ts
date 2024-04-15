import { dataSource } from '@/db/data-source'
import { Organization } from '@/db/entity/Organization'

import { OrganizationRepository } from '../organization-repository'

export class TypeOrmOrganizationRepostory implements OrganizationRepository {
  async create(data: Organization): Promise<Organization> {
    const organization = await dataSource.getRepository(Organization).save(data)

    return organization
  }
}
