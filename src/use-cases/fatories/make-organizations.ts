import { TypeOrmAddressRepository } from '@/repositories/typeorm/typeorm-address-repository'
import { TypeOrmOrganizationRepostory } from '@/repositories/typeorm/typeorm-organization-repository'

import { CreateOrganizationUseCase } from '../create-organization-use-case'

export const makeOrganization = () => {
  const addressRepository = new TypeOrmAddressRepository()
  const organizationRepository = new TypeOrmOrganizationRepostory()

  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationRepository,
    addressRepository,
  )

  return createOrganizationUseCase
}
