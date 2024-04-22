import { Organization } from '@/db/entity/Organization'

import { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  private dataBase: Organization[] = []

  async findById(id: string): Promise<Organization | null> {
    const organization = this.dataBase.find((data) => data.id === id) || null

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization =
      this.dataBase.find((data) => data.email === email) || null

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
