import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'

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

  it('shuld be able to register a pet in organization', async () => {
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
      phone: '21999132991',
    })

    const { pet } = await sut.execute({
      age: 4,
      breed: 'Golden Retriver',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Dog',
      photo: 'teste.png',
      traits: ['Brincalhão', 'Fofo'],
      size: 'small',
      organizationId: organization.id,
    })

    expect(pet.name).toEqual('Dog')
    expect(pet).toEqual(expect.objectContaining(pet))
    expect(pet.organization).toEqual(expect.objectContaining(organization))
  })

  it('should not be possible to register a pet without an organization', async () => {
    await expect(
      sut.execute({
        age: 4,
        breed: 'Golden Retriver',
        description:
          'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
        name: 'Dog',
        photo: 'teste',
        traits: ['Brincalhão', 'Fofo'],
        size: 'small',
        organizationId: '1',
      }),
    ).rejects.to.toBeInstanceOf(OrgNotFoundError)
  })
})
