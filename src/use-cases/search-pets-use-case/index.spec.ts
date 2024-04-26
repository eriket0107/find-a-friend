import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'
import { makeOrganization } from '@/tests/makeOrg'
import { makePet } from '@/tests/makePet'

import { SearchPetsUseCase } from '.'

let petRepository: InMemoryPetRepository
let sut: SearchPetsUseCase

let organizationRepository: InMemoryOrganizationRepository

describe('Search Pets Use Case', async () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new SearchPetsUseCase(petRepository)
  })

  it('should be able to search for a pet by params', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const fakePet1 = makePet()
    const fakePet2 = makePet({
      breed: 'Cocker Spaniel',
      traits: ['Travesso', 'Fofo'],
    })

    const promises = [fakePet1, fakePet2].map((pet) =>
      petRepository.create({
        ...pet,
        organization,
      }),
    )

    await Promise.all(promises)

    const { pets } = await sut.execute({
      traits: ['travesso', 'fofo'],
      age: 4,
      city: organization.address.city,
    })

    expect(pets).toHaveLength(2)
  })
  it('should return empty search', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const fakePet1 = makePet()
    const fakePet2 = makePet({
      breed: 'Cocker Spaniel',
      traits: ['Travesso', 'Fofo'],
    })

    const promises = [fakePet1, fakePet2].map((pet) =>
      petRepository.create({
        ...pet,
        organization,
      }),
    )

    await Promise.all(promises)

    const { pets } = await sut.execute({
      age: 1,
      city: 'são paulo',
      size: 'big',
    })

    expect(pets).toHaveLength(0)
  })
  it('should be able to search by traits', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const fakePet = makePet({
      traits: ['Travesso'],
    })
    const fakePet2 = makePet({
      traits: ['Fofo'],
    })

    const promises = [fakePet, fakePet2].map((pet) =>
      petRepository.create({
        ...pet,
        organization,
      }),
    )

    await Promise.all(promises)

    const { pets } = await sut.execute({
      traits: ['Travesso'],
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].traits).toContain('Travesso')
  })
})
