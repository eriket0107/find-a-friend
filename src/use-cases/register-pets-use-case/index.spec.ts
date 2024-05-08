import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'
import { makeOrganization } from '@/tests/makeOrg'
import { makePet } from '@/tests/makePet'

import { OrgNotFoundError } from '../errors/org-not-found-error'
import { RegisterPetsUseCase } from '.'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterPetsUseCase

describe('Register Pet Use Case', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterPetsUseCase(petRepository, organizationRepository)
  })

  it('should be able to register a pet in organization', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const { pet } = await sut.execute({
      ...makePet(),
      organizationId: organization.id,
    })

    expect(pet.name).toEqual(pet.name)
    expect(pet).toEqual(expect.objectContaining(pet))
    expect(pet.organization).toEqual(expect.objectContaining(organization))
  })

  it('should not be possible to register a pet without an organization', async () => {
    await expect(
      sut.execute({
        ...makePet(),
        organizationId: '1',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
