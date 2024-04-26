import { Pet } from 'db/entity/Pet'

import { PetRepository } from '@/repositories/pet-repository'

import { PetNotFoundError } from '../errors/pet-not-found-error'

type GetAPetRequest = {
  petId: string
}

type GetAPetResponse = {
  pet: Pet
}

export class GetAPetuseCae {
  constructor(private petRepository: PetRepository) {}
  async execute({ petId }: GetAPetRequest): Promise<GetAPetResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) throw new PetNotFoundError()

    return { pet }
  }
}
