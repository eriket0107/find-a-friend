import { PetRepository } from '@/repositories/pet-repository'

import { PetNotFoundError } from '../errors/pet-not-found-error'
import { PhotoSizeExcededError } from '../errors/photo-size-exceded-error'
import { InvalidPhotoUploadTypeError } from '../errors/photo-upload-invalid-type-error'

type UploadPetPhotoUseCaseRequest = {
  petId: string
  photo: string
  size: number
  type: string
}

export class UploadPetPhotoUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ petId, photo, size, type }: UploadPetPhotoUseCaseRequest) {
    const pet = await this.petRepository.findById(petId)

    if (!pet) throw new PetNotFoundError()

    if (type !== 'webp') throw new InvalidPhotoUploadTypeError()

    if (size > 1024) throw new PhotoSizeExcededError()

    await this.petRepository.insertPhoto(petId, photo)

    return { photo }
  }
}
