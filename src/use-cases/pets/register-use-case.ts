import { Pet } from '@/db/entity/Pet'
import { PetRepository } from '@/repositories/pet-repository'

type RegisterPetsUseCaseRequest = {
  age: number
  breed: string
  description: string
  name: string
  traits: string[]
  photo: string
  organization?: string | null
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
  }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age,
      breed,
      description,
      name,
      photo,
      traits,
    })

    return pet
  }
}
