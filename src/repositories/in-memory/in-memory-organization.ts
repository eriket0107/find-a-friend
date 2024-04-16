import { Organization } from '@/db/entity/Organization'

import { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  private dataBase: Organization[] = []

  async findById(id: string): Promise<Organization> {
    const organization = this.dataBase.find((data) => data.id === id)

    if (!organization) throw new Error('Could not find organization')

    return organization
  }

  async create(data: Organization) {
    const organization = {
      cnpj: data.cnpj,
      name: data.name,
      email: data.email,
      password: data.password,
      whatsapp: data.whatsapp,
      address: data.address,
    }

    this.dataBase.push(organization)
    return organization
  }
}
