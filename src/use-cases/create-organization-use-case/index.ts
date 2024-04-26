import { Address } from '@/db/entity/Address'
import { Organization } from '@/db/entity/Organization'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { PasswordHandler } from '@/services/passwordHandler'

import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

type CreateOrganizationRequest = {
  name: string
  email: string
  password: string
  cnpj: string
  phone: string
  address: Address
}

type CreateOrganizationResponse = {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private PasswordHandler: PasswordHandler,
  ) {}

  async execute({
    cnpj,
    name,
    email,
    password,
    phone,
    address,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const organizationByEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationByEmail) throw new OrgAlreadyExistsError()

    const password_hash = await this.PasswordHandler.hashPassword(password, 6)

    const organization = await this.organizationRepository.create({
      cnpj,
      name,
      whatsapp: `https://wa.me/+55${phone}`,
      phone,
      email,
      password: password_hash,
      address,
    })

    return { organization }
  }
}
