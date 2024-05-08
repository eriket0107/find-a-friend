import { Pet } from 'db/entity/Pet'

import { OrganizationRepository } from '@/repositories/organization-repository'
import { PetRepository } from '@/repositories/pet-repository'

import { OrgNotFoundError } from '../errors/org-not-found-error'

type RegisterPetsUseCaseRequest = {
  age: number
  breed: string
  description: string
  name: string
  traits: string[]
  size: string
  organizationId: string
}
type RegisterPetsUseCaseResponse = {
  pet: Pet
}

export class RegisterPetsUseCase {
  constructor(
    private petsRepository: PetRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    age,
    breed,
    description,
    name,
    traits,
    size,
    organizationId,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) throw new OrgNotFoundError()

    const pet = await this.petsRepository.create({
      age,
      breed,
      description,
      name,
      traits,
      organization,
      size,
    })

    return { pet }
  }
}
