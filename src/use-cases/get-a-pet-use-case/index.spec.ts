import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'
import { makeOrganization } from '@/tests/makeOrg'
import { makePet } from '@/tests/makePet'

import { PetNotFoundError } from '../errors/pet-not-found-error'
import { GetAPetuseCae } from '.'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: GetAPetuseCae

describe('Register Pet Use Case', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new GetAPetuseCae(petRepository)
  })

  it('shuld be able to get current pet', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const pet1 = await petRepository.create({ ...makePet(), organization })

    const { pet } = await sut.execute({ petId: pet1.id })

    expect(pet.name).toEqual(pet1.name)
    expect(pet).toEqual(expect.objectContaining(pet1))
    expect(pet.organization).toEqual(expect.objectContaining(organization))
  })

  it('should not be possible to find a pet', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)
    await petRepository.create({ ...makePet(), organization })

    await expect(
      sut.execute({
        petId: '1',
      }),
    ).rejects.to.toBeInstanceOf(PetNotFoundError)
  })
})
