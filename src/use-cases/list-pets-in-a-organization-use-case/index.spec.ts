import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'
import { makeOrganization } from '@/tests/makeOrg'
import { makePet } from '@/tests/makePet'

import { OrgNotFoundError } from '../errors/org-not-found-error'
import { ListPetsInAOrganizationUseCase } from '.'

let organizationRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let sut: ListPetsInAOrganizationUseCase

describe('List Pets in a organization Use Case', async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new ListPetsInAOrganizationUseCase(
      organizationRepository,
      petRepository,
    )
  })

  it('should not be able to find an organization', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const fakePet = makePet()

    await petRepository.create({ ...fakePet, organization })

    await expect(sut.execute({ organizationId: '2' })).rejects.toBeInstanceOf(
      OrgNotFoundError,
    )
  })

  it('should be able to list all pets in a organization', async () => {
    const fakeOrg = makeOrganization()
    const organization = await organizationRepository.create(fakeOrg)

    const fakePet = makePet()
    const fakePet2 = makePet()
    const fakePet3 = makePet()

    const promises = [fakePet, fakePet2, fakePet3].map((pet) =>
      petRepository.create({ ...pet, organization }),
    )
    await Promise.all(promises)

    const { pets } = await sut.execute({ organizationId: organization.id })

    expect(pets).toHaveLength(3)
    expect(pets[1].name).toEqual(fakePet2.name)
    expect(pets[2].organization?.id).toEqual(organization.id)
  })
})
