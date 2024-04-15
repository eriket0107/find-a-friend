import { Organization } from '@/db/entity/Organization'
import { Pet } from '@/db/entity/Pet'
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
  constructor(private petsRepository: PetRepository) {}

  async execute({
    age,
    breed,
    description,
    name,
    photo,
    traits,
    organizationId,
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {
    // TODO: Create organization call

    const pet = await this.petsRepository.create({
      age,
      breed,
      description,
      name,
      photo,
      traits,
      organization,
    })

    return pet
  }
}
