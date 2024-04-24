import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'

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
    const address = {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      zipCode: '22790710',
      street: 'Alfredo Balthazar da silveira',
    }

    const organization = await organizationRepository.create({
      address,
      id: randomUUID(),
      cnpj: '89656977000175',
      email: 'organization@email.com',
      name: 'Organization',
      password: '123456',
      whatsapp: '21999132991',
    })

    await petRepository.create({
      age: 4,
      breed: 'Cocker Spaniel',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Beto',
      photo: 'teste.png',
      traits: ['Brincalhão', 'Fofo'],
      organization,
    })

    await expect(sut.execute({ organizationId: '2' })).rejects.toBeInstanceOf(
      OrgNotFoundError,
    )
  })

  it('should be able to list all pets in a organization', async () => {
    const address = {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      zipCode: '22790710',
      street: 'Alfredo Balthazar da silveira',
    }

    const organization = await organizationRepository.create({
      address,
      id: randomUUID(),
      cnpj: '89656977000175',
      email: 'organization@email.com',
      name: 'Organization',
      password: '123456',
      whatsapp: '21999132991',
    })

    await petRepository.create({
      age: 4,
      breed: 'Cocker Spaniel',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Beto',
      photo: 'teste.png',
      traits: ['Brincalhão', 'Fofo'],
      organization,
    })

    const petToCheck = await petRepository.create({
      age: 4,
      breed: 'Golden Retriver',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Sandro',
      photo: 'teste1.png',
      traits: ['Brincalhão', 'Fofo'],
      organization,
    })

    const { pets } = await sut.execute({ organizationId: organization.id })

    expect(pets).toHaveLength(2)
    expect(pets[1]).toEqual(petToCheck)
    expect(pets[1].organization?.id).toEqual(organization.id)
  })
})
