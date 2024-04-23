import { TypeOrmOrganizationRepostory } from '@/repositories/typeorm/typeorm-organization-repository'
import { TypeOrmPetRepository } from '@/repositories/typeorm/typeorm-pet-repository'

import { RegisterPetsUseCase } from '../register-pets-use-case'

export const makePet = () => {
  const organizationRepository = new TypeOrmOrganizationRepostory()
  const petRepository = new TypeOrmPetRepository()

  const registerPetsUseCase = new RegisterPetsUseCase(
    petRepository,
    organizationRepository,
  )

  return registerPetsUseCase
}
