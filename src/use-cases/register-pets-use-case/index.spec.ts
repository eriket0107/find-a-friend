import { beforeEach, describe, expect, it } from 'vitest'

import { Organization } from '@/db/entity/Organization'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet'

import { RegisterPetsUseCase } from '.'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterPetsUseCase
let organization: Organization

describe('Register Pet Use Case', async () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterPetsUseCase(petRepository, organizationRepository)

    const address = {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BRA',
      zipCode: '22790710',
      street: 'Alfredo Balthazar da silveira',
    }

    organization = await organizationRepository.create({
      address,
      cnpj: '89656977000175',
      email: 'organization@email.com',
      name: 'Organization',
      password: '123456',
      whatsapp: '21999132991',
    })
  })

  it('shuld be able to register a pet in organization', async () => {
    const { pet } = await sut.execute({
      age: 4,
      breed: 'Golden Retriver',
      description:
        'Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum Lorem Ipsum is Lorem Ipsum',
      name: 'Dog',
      photo: 'teste',
      traits: ['Brincalhão', 'Fofo'],
      organizationId: organization.id as string,
    })

    expect(pet.name).toEqual('Dog')
    expect(pet).toEqual(expect.objectContaining(pet))
    expect(pet.organization).toEqual(expect.objectContaining(organization))
  })
})
