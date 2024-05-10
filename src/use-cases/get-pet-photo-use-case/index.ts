import { PetRepository } from '@/repositories/pet-repository'

import { PetNotFoundError } from '../errors/pet-not-found-error'

type GetPetPhotoUseCaseRequest = {
  petId: string
}

export class GetPetPhotoUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ petId }: GetPetPhotoUseCaseRequest) {
    const pet = await this.petRepository.findById(petId)

    if (!pet) throw new PetNotFoundError()

    const { photo } = pet
    if (!photo || !photo === null) throw new Error('Photo not found')

    const type = `image/${photo.split('.').pop()}`

    return { photo, type }
  }
}
