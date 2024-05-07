import { TypeOrmOrganizationRepostory } from '@/repositories/typeorm/typeorm-organization-repository'
import { PasswordHandler } from '@/services/passwordHandler'

import { CreateOrganizationUseCase } from '../create-organization-use-case'

export const makeOrganization = () => {
  const organizationRepository = new TypeOrmOrganizationRepostory()

  const passwordHandle = new PasswordHandler()

  const createOrganizationUseCase = new CreateOrganizationUseCase(
    organizationRepository,
    passwordHandle,
  )

  return createOrganizationUseCase
}
