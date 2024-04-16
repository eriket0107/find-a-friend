import { Address } from '@/db/entity/Address'
import { Organization } from '@/db/entity/Organization'
import { AddressRepository } from '@/repositories/address-repository'
import { OrganizationRepository } from '@/repositories/organization-repository'

type CreateOrganizationRequest = {
  name: string
  cnpj: string
  phone: string
  addressData: Address
}

type CreateOrganizationResponse = {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private addressRepository: AddressRepository,
  ) {}

  async execute({
    cnpj,
    name,
    phone,
    addressData,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const address = await this.addressRepository.create(addressData)
    const organization = await this.organizationRepository.create({
      address,
      cnpj,
      name,
      phone,
    })

    return { organization }
  }
}
