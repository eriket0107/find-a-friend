import { TypeOrmOrganizationRepostory } from '@/repositories/typeorm/typeorm-organization-repository'

import { CreateOrganizationUseCase } from '../create-organization-use-case'

export const makeOrganization = () => {
  const organizationRepository = new TypeOrmOrganizationRepostory()

  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationRepository,
  )

  return createOrganizationUseCase
}
