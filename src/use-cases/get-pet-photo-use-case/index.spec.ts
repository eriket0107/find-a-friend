import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'
import { makeOrganization } from '@/tests/makeOrg'
import { makePet } from '@/tests/makePet'

import { GetPetPhotoUseCase } from '.'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: GetPetPhotoUseCase

describe('Get Pet Photo Use Case', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sut = new GetPetPhotoUseCase(petRepository)
  })

  it('should be able to get pet photo', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const fakePet = await petRepository.create({ ...makePet(), organization })
  })
})
