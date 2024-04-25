import { Pet } from '@/db/entity/Pet'
import { PetRepository } from '@/repositories/pet-repository'

type SearchPetsUseCaseRequest = {
  breed?: string
  traits?: string[]
  size?: string
  city?: string
  age?: number
}

type RegisterPetsUseCaseResponse = {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    data: SearchPetsUseCaseRequest,
  ): Promise<RegisterPetsUseCaseResponse> {
    const pets = await this.petRepository.search(data)

    return { pets }
  }
}
