import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'
import { makeOrganization } from '@/tests/makeOrg'
import { makePet } from '@/tests/makePet'

import { PetNotFoundError } from '../errors/pet-not-found-error'
import { PhotoSizeExcededError } from '../errors/photo-size-exceded-error'
import { InvalidPhotoUploadTyeError } from '../errors/photo-upload-invalid-type-error'
import { UploadPetPhotoUseCase } from '.'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: UploadPetPhotoUseCase

describe('Register Pet Use Case', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new UploadPetPhotoUseCase(petRepository)
  })

  it('should be able to to upload a pet photo upon registration', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const date = Date.now()

    const fakePet = await petRepository.create({ ...makePet(), organization })

    const { photo } = await sut.execute({
      petId: fakePet.id,
      photo: `src/uploads/${date}-photo-images.webp`,
      size: 1024,
      type: 'webp',
    })

    expect(photo).toEqual(expect.any(String))
    expect(fakePet.photo).toEqual(`src/uploads/${date}-photo-images.webp`)
  })

  it('should not be possible to upload a pet photo when pet does not exist', async () => {
    const date = Date.now()

    await expect(
      sut.execute({
        petId: '1',
        photo: `src/uploads/${date}-photo-images.webp`,
        size: 1024,
        type: 'webp',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })

  it('should not be possible to upload a pet photo bigger than 1024MB', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const date = Date.now()

    const fakePet = await petRepository.create({ ...makePet(), organization })

    await expect(
      sut.execute({
        petId: fakePet.id,
        photo: `src/uploads/${date}-photo-images.webp`,
        size: 1025,
        type: 'webp',
      }),
    ).rejects.toBeInstanceOf(PhotoSizeExcededError)
  })

  it("should not be possible to upload a pet photo different than 'jpg', 'jpeg', 'png', 'webp'", async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const date = Date.now()

    const fakePet = await petRepository.create({ ...makePet(), organization })

    await expect(
      sut.execute({
        petId: fakePet.id,
        photo: `src/uploads/${date}-photo-images.svg`,
        size: 1025,
        type: 'svg',
      }),
    ).rejects.toBeInstanceOf(InvalidPhotoUploadTyeError)
  })
})
