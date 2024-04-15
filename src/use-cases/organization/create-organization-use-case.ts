import { Address } from '@/db/entity/Address'
import { Organization } from '@/db/entity/Organization'

type CreateOrganizationRequest = {
  name: string
  cnpj: string
  phone: string
  address: Address
}

type CreateOrganizationResponse = {
  organization: Organization
}

export class CreateOrganizationUseCase {
  private OrganizationRepository
  constructor() {}

  async execute({}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {}
}
