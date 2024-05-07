import { PetRepository } from '@/repositories/pet-repository'

import { PetNotFoundError } from '../errors/pet-not-found-error'

type UploadPetPhotoUseCaseRequest = {
  petId: string
  photo: string
  size: number
}

export class UploadPetPhotoUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ petId, photo, size }: UploadPetPhotoUseCaseRequest) {
    const pet = await this.petRepository.findById(petId)

    if (!pet) throw new PetNotFoundError()

    if (size > 1024) throw new Error('File size is too large')

    await this.petRepository.insertPhoto(petId, photo)
  }
}
