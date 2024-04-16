import { Pet } from '@/db/entity/Pet'
// import { OrganizationRepository } from '@/repositories/organization-repository'
import { PetRepository } from '@/repositories/pet-repository'

type RegisterPetsUseCaseRequest = {
  age: number
  breed: string
  description: string
  name: string
  traits: string[]
  photo: string
  organizationId: string
}
type RegisterPetsUseCaseResponse = {
  pet: Pet
}

export class RegisterPetsUseCase {
  constructor(
    private petsRepository: PetRepository,
    // private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    age,
    breed,
    description,
    name,
    photo,
    traits,
    organizationId,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {
    const pet = await this.petsRepository.create({
      organizationId,
      age,
      breed,
      description,
      name,
      photo,
      traits,
    })

    return { pet }
  }
}
