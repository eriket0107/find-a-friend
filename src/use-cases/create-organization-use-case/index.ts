import { hash } from 'bcryptjs'

import { Address } from '@/db/entity/Address'
import { Organization } from '@/db/entity/Organization'
import { AddressRepository } from '@/repositories/address-repository'
import { OrganizationRepository } from '@/repositories/organization-repository'

import { OrgAlreadyExistsError } from '../errors/org-already-exists'

type CreateOrganizationRequest = {
  name: string
  email: string
  password: string
  cnpj: string
  whatsapp: string
  addressInput: Address
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
    email,
    password,
    whatsapp,
    addressInput,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const organizationByEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationByEmail) throw new OrgAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      cnpj,
      name,
      whatsapp,
      email,
      password: password_hash,
      address: addressInput,
    })

    return { organization }
  }
}
